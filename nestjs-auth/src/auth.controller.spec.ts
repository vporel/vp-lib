//tests for the auth controller
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService, AuthMethodDto, SigninDto } from './auth.service';
import { ThirdPartyAuthService } from '@vporel/nestjs-third-party-auth';
import { BadRequestException, HttpStatus, INestApplication } from '@nestjs/common';
import { mock } from 'jest-mock-extended';
import * as request from 'supertest';
import { AuthModuleOptions } from './auth.module';
import { IUserFinder } from './user-finder.interface';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
	let testAccessToken = "accessToken";
	let testUser = {id: "userid", email: "test@example.com"}
	let testUserClass = "Professional";
	let app: INestApplication;
	let controller: AuthController;
	let authService: AuthService;
    let userFinder: IUserFinder;

	beforeAll(async () => {
		const userFinderMock = mock<IUserFinder>();
		userFinderMock.findById.mockResolvedValue(testUser);
		const authServiceMock = mock<AuthService>();
		const thirdPartyAuthServiceMock = mock<ThirdPartyAuthService>();
		const jwtServiceMock = mock<JwtService>();
		jwtServiceMock.verifyAsync.mockResolvedValue({
			userId: testUser.id,
			userClass: 'Professional'
		});

		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{ provide: 'USER_FINDER', useValue: userFinderMock },
				{ provide: 'AUTH_OPTIONS', useValue: { jwtSecretKey: "jwtsecretkey", jwtExpirationTime: "3600s" } as AuthModuleOptions },
				{ provide: JwtService, useValue: jwtServiceMock },
				{ provide: AuthService, useValue: authServiceMock },
				{ provide: ThirdPartyAuthService, useValue: thirdPartyAuthServiceMock },
			],
		}).compile();

		app = module.createNestApplication();
		await app.init()
		controller = module.get<AuthController>(AuthController);
		authService = module.get<AuthService>(AuthService);
		userFinder = module.get<IUserFinder>('USER_FINDER');

	});

	describe('POST /auth/email-exists', () => {
		it('should return false if the email does not exist', async () => {
			authService.getUserData = jest.fn().mockResolvedValue(null);
			return request(app.getHttpServer())
				.post('/auth/email-exists')
				.expect(HttpStatus.OK)
				.expect('false')
		})

		it('should return an object containing the user type if the email exists', async () => {
			authService.getUserData = jest.fn().mockResolvedValue({user: testUser, userClass: testUserClass});
			return request(app.getHttpServer())
				.post('/auth/email-exists')
				.expect(HttpStatus.OK)
				.expect({userType: testUserClass.toLowerCase()});
		})
	})

	describe('GET /auth/current-user', () => {
		it('should return the current user and user type', async () => {
			return request(app.getHttpServer())
				.get('/auth/current-user')
				.set('Authorization', `Bearer ${testAccessToken}`)
				.expect(HttpStatus.OK)
				.expect({
					user: testUser,
					userType: testUserClass.toLowerCase()
				});
		})
	})
})