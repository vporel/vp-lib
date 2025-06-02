//Write a test for the auth service using Jest
import { Test, TestingModule } from '@nestjs/testing';
import { AuthMethodDto, AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { IUserFinder } from './user-finder.interface';
import { BadRequestException, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AuthModuleOptions } from './auth.module';
import { ThirdPartyAuthService } from '@vporel/nestjs-third-party-auth';
import { mock } from 'jest-mock-extended';


describe('AuthService', () => {
    const testEmail = 'test@example.com';
    const testThirdPartyServiceAccessToken = 'xxxx';

    let service: AuthService;
    let authOptions: AuthModuleOptions;
    let userFinder: IUserFinder;
    let jwtService: JwtService;
    let thirdPartyAuthService: ThirdPartyAuthService;

    beforeAll(async () => {
        const thirdPartyAuthServiceMock = mock<ThirdPartyAuthService>();
        thirdPartyAuthServiceMock.getUserInfos.mockResolvedValue({ email: testEmail })

        const jwtServiceMock = mock<JwtService>();
        jwtServiceMock.signAsync.mockResolvedValue(testThirdPartyServiceAccessToken);
        
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            AuthService,
            { provide: 'USER_FINDER', useValue: mock<IUserFinder>() },
            { provide: JwtService, useValue: jwtServiceMock },
            { provide: 'AUTH_OPTIONS', useValue: { jwtSecretKey: "jwtsecretkey", jwtExpirationTime: "3600s" } as AuthModuleOptions },
            { provide: ThirdPartyAuthService, useValue: thirdPartyAuthServiceMock },
        ],
        }).compile();
        service = module.get<AuthService>(AuthService);
        authOptions = module.get<AuthModuleOptions>('AUTH_OPTIONS');
        userFinder = module.get<IUserFinder>('USER_FINDER');
        jwtService = module.get<JwtService>(JwtService);
        thirdPartyAuthService = module.get<ThirdPartyAuthService>(ThirdPartyAuthService);
    });

    describe('getUserData', () => {
        const user = { email: testEmail };
        const userClass = 'Professional';

        beforeAll(() => {
            const user = { email: testEmail };
            userFinder.findByEmail = jest.fn().mockResolvedValue({user, userClass});
        })

        it('should return user data for an email string', async () => {
            const result = await service.getUserData(testEmail);
            expect(result).toEqual({ user, userClass });
        });

        it('should return user data for an authMethod with email methodName', async () => {
            const result = await service.getUserData({ methodName: 'email', email: testEmail });
            expect(result).toEqual({ user, userClass });
        });

        it('should return user data for an authMethod with a third-party service', async () => {
            thirdPartyAuthService.getUserInfos = jest.fn().mockResolvedValue({ email: testEmail });
            const result = await service.getUserData({ methodName: 'google', accessToken: testThirdPartyServiceAccessToken });
            expect(result).toEqual({ user, userClass });
        });
    });

    describe('signIn', () => {        
        it("should throw NotFoundException if no user is found with the given email", async () => {
            userFinder.findByEmail = jest.fn().mockResolvedValue(null);
            try {
                await service.signIn({ methodName: 'email', email: testEmail, password: 'password' });
                fail('Expected NotFoundException to be thrown');
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toContain('user_not_found');
            }
        })

        it('should throw UnauthorizedException if the password is incorrect', async () => {
            userFinder.findByEmail = jest.fn().mockResolvedValue({user: {email: testEmail}, userClass: 'Professional'});
            userFinder.comparePasswords = jest.fn().mockResolvedValue(false);
            try {
                await service.signIn({ methodName: 'email', email: testEmail, password: 'wrong_password' });
                fail('Expected UnauthorizedException to be thrown');
            } catch (e) {
                expect(e).toBeInstanceOf(UnauthorizedException);
                expect(e.message).toContain('incorrect_password');
            }
        });

        it('should return a valid auth token for correct credentials', async () => {
            userFinder.findByEmail = jest.fn().mockResolvedValue({user: {email: testEmail}, userClass: 'Professional'});
            userFinder.comparePasswords = jest.fn().mockResolvedValue(true);
            const result = await service.signIn({ methodName: 'email', email: testEmail, password: 'password' });
            expect(result).toEqual({
                accessToken: testThirdPartyServiceAccessToken,
                expiresIn: parseInt(authOptions.jwtExpirationTime),
                userType: 'professional',
            });
        });
    })

    describe('getAuthToken', () => {
        it('should return a valid auth token', async () => {
            const user = { id: '123' };
            const userClass = 'Professional';
            const result = await service.getAuthToken(user, userClass);
            expect(result).toEqual({
                accessToken: testThirdPartyServiceAccessToken,
                expiresIn: parseInt(authOptions.jwtExpirationTime),
                userType: userClass.toLowerCase(),
            });
        })
    })

    describe('getEmailFromAuthMethod', () => {
        it('should return email if method is email', async () => {
            const email = await service.getEmailFromAuthMethod({methodName: 'email', email: testEmail});
            expect(email).toBe(testEmail)
        })

        it('should call third-party auth service if method is not email', async () => {
            const methodName = 'google';
            const email = await service.getEmailFromAuthMethod({methodName, accessToken: testThirdPartyServiceAccessToken})
            expect(thirdPartyAuthService.getUserInfos).toHaveBeenCalledWith(methodName, testThirdPartyServiceAccessToken)
            expect(email).toBe(testEmail)
        })

        it("should throw an error if third-party auth service is not available", async () => {
            const serviceWithoutThirdParty = new AuthService(authOptions, userFinder, jwtService, null);
            await expect(serviceWithoutThirdParty.getEmailFromAuthMethod({methodName: 'google', accessToken: testThirdPartyServiceAccessToken})).rejects.toThrow(InternalServerErrorException);
        })
    })
})
