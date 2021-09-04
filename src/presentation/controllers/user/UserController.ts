import {
    Body,
    HttpCode,
    JsonController,
    Post,
    UseAfter,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import { CreateUserCommand } from '../../../core/usecases/user/commands/create-user/CreateUserCommand';
import { CreateUserCommandHandle } from '../../../core/usecases/user/commands/create-user/CreateUserCommandHandle';
import { CreateUserCommandResult } from '../../../core/usecases/user/commands/create-user/CreateUserCommandResult';
import { ErrorMiddleware } from '../../middlewares/ErrorMiddleware';

@Service()
@JsonController('/user')
@UseAfter(ErrorMiddleware)
export class UserController {
    constructor(
        private readonly _createUserCommandHandle: CreateUserCommandHandle,
    ) {}

    @HttpCode(201)
    @Post('/')
    @OpenAPI({
        description: 'Create User.',
    })
    @ResponseSchema(CreateUserCommandResult)
    async create(
        @Body() body: CreateUserCommand,
    ): Promise<CreateUserCommandResult> {
        const result = await this._createUserCommandHandle.handle(body);
        return result;
    }
}
