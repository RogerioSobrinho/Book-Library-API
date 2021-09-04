import {
    Body,
    HttpCode,
    JsonController,
    Post,
    UseAfter,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service } from 'typedi';
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
    ) {}

    @HttpCode(200)
    @Post('/')
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
