import { Inject, Service } from 'typedi';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';
import { ICommandHandler } from '../../../../domain/common/usecases/interfaces/ICommandHandler';
import { User } from '../../../../domain/entities/User';
import { IUserRepository } from '../../../../repositories/user/IUserRepository';
import { IAuthJwtService } from '../../../../services/auth/IAuthJwtService';
import { ICryptoService } from '../../../../services/crypto/ICryptoService';
import { CreateUserCommand } from './CreateUserCommand';
import { CreateUserCommandResult } from './CreateUserCommandResult';

@Service()
export class CreateUserCommandHandle
    implements ICommandHandler<CreateUserCommand, CreateUserCommandResult>
{
    @Inject('user.repository')
    private readonly _userRepository: IUserRepository;

    @Inject('crypto.service')
    private readonly _cryptoService: ICryptoService;

    @Inject('auth_jwt.service')
    private readonly _authJWTService: IAuthJwtService;

    async handle(_param: CreateUserCommand): Promise<CreateUserCommandResult> {
        if (!_param || !_param.email || !_param.password) {
            throw new SystemError(
                MessageError.PARAM_IS_REQUIRED,
                'email and password',
            );
        }

        const isUser = await this._userRepository.getByEmail(_param.email);
        if (isUser != null)
            throw new SystemError(MessageError.PARAM_EXISTED, 'email');

        const user = new User();
        user.email = _param.email;
        user.role = _param.role;
        user.password = await this._cryptoService.generateHash(_param.password);
        const createdUser = await this._userRepository.createGet(user);
        const token = await this._authJWTService.sign(createdUser.id);

        return new CreateUserCommandResult(token, createdUser.id);
    }
}
