import { Inject, Service } from 'typedi';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';
import { IQueryHandler } from '../../../../domain/common/usecases/interfaces/IQueryHandler';
import { IUserRepository } from '../../../../repositories/user/IUserRepository';
import { IAuthJwtService } from '../../../../services/auth/IAuthJwtService';
import { ICryptoService } from '../../../../services/crypto/ICryptoService';
import { LoginByEmailQuery } from './LoginByEmailQuery';
import { LoginByEmailQueryResult } from './LoginByEmailQueryResult';

@Service()
export class LoginByEmailQueryHandle
    implements IQueryHandler<LoginByEmailQuery, LoginByEmailQueryResult>
{
    @Inject('user.repository')
    private readonly _userRepository: IUserRepository;

    @Inject('crypto.service')
    private readonly _cryptoService: ICryptoService;

    @Inject('auth_jwt.service')
    private readonly _authJWTService: IAuthJwtService;

    async handle(_param: LoginByEmailQuery): Promise<LoginByEmailQueryResult> {
        const user = await this._userRepository.getByEmail(_param.email);
        if (!user) throw new SystemError(MessageError.USER_NOT_FOUND);
        const isValidPassword = await this._cryptoService.compareHash(
            _param.password,
            user.password,
        );
        if (!isValidPassword)
            throw new SystemError(MessageError.PARAM_INVALID, 'password');

        const token = await this._authJWTService.sign(user.id);

        return new LoginByEmailQueryResult(token, user.id);
    }
}
