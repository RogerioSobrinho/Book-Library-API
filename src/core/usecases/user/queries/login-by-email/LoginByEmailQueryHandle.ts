import { Inject, Service } from 'typedi';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';
import { ICommandHandler } from '../../../../domain/common/usecases/interfaces/ICommandHandler';
import { IUserRepository } from '../../../../repositories/user/IUserRepository';
import { ICryptoService } from '../../../../services/crypto/ICryptoService';
import { LoginByEmailQuery } from './LoginByEmailQuery';
import { LoginByEmailQueryResult } from './LoginByEmailQueryResult';

@Service()
export class LoginByEmailQueryHandle
    implements ICommandHandler<LoginByEmailQuery, LoginByEmailQueryResult>
{
    @Inject('user.repository')
    private readonly _userRepository: IUserRepository;

    @Inject('crypto.service')
    private readonly _cryptoService: ICryptoService;

    async handle(_param: LoginByEmailQuery): Promise<LoginByEmailQueryResult> {
        const user = await this._userRepository.getByEmail(_param.email);
        if (!user) throw new SystemError(MessageError.USER_NOT_FOUND);
        const isValidPassword = this._cryptoService.checkStringToHash(
            _param.password,
            user.password,
        );
        if (!isValidPassword)
            throw new SystemError(MessageError.PARAM_INVALID, 'password');

        return { email: user.email };
    }
}
