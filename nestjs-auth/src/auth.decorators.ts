import { SetMetadata, createParamDecorator, ExecutionContext } from "@nestjs/common";

export const SKIP_AUTH_KEY = 'skip-auth'
export const SkipAuth = () => SetMetadata(SKIP_AUTH_KEY, true)

export const CurrentUserClass = createParamDecorator((data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return data ? request.UserClass?.[data] : request.UserClass;
})

export const CurrentUser = createParamDecorator((data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return data ? request.user?.[data] : request.user;
})