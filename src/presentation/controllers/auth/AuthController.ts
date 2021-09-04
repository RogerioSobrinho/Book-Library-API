import {
    Body,
    HeaderParam,
    HttpCode,
    JsonController,
    Post,
    UseAfter,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import { GetUserAuthByJwtQuery } from '../../../core/usecases/user/queries/get-user-auth-by-jwt/GetUserAuthByJwtQuery';
import { GetUserAuthByJwtQueryHandle } from '../../../core/usecases/user/queries/get-user-auth-by-jwt/GetUserAuthByJwtQueryHandler';
import { LoginByEmailQuery } from '../../../core/usecases/user/queries/login-by-email/LoginByEmailQuery';
import { LoginByEmailQueryHandle } from '../../../core/usecases/user/queries/login-by-email/LoginByEmailQueryHandle';
import { LoginByEmailQueryResult } from '../../../core/usecases/user/queries/login-by-email/LoginByEmailQueryResult';
import { ErrorMiddleware } from '../../middlewares/ErrorMiddleware';

@Service()
@JsonController('/auth')
@UseAfter(ErrorMiddleware)
export class AuthController {
    constructor(
        private readonly _loginByEmailQueryHandle: LoginByEmailQueryHandle,
        private readonly _getUserAuthByJwtQueryHandler: GetUserAuthByJwtQueryHandle,
    ) {}

    @Post('/')
    async authenticate(
        @HeaderParam('authorization') authorization: string,
    ): Promise<LoginByEmailQueryResult> {
        const param = new GetUserAuthByJwtQuery();
        param.token = authorization;
        return await this._getUserAuthByJwtQueryHandler.handle(param);
    }

    @HttpCode(200)
    @Post('/login')
    @OpenAPI({
        description: 'Auth',
    })
    @ResponseSchema(LoginByEmailQueryResult)
    async create(
        @Body() body: LoginByEmailQuery,
    ): Promise<LoginByEmailQueryResult> {
        const result = await this._loginByEmailQueryHandle.handle(body);
        return result;
    }
}
