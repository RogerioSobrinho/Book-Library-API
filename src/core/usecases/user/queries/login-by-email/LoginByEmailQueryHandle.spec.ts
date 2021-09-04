/* eslint-disable @typescript-eslint/no-empty-function */
import Container from 'typedi';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';
import { User } from '../../../../domain/entities/User';
import { IUserRepository } from '../../../../repositories/user/IUserRepository';
import { ICryptoService } from '../../../../services/crypto/ICryptoService';
import { LoginByEmailQueryHandle } from './LoginByEmailQueryHandle';

Container.set('user.repository', {
    async getByEmail() {},
});
Container.set('crypto.service', {
    async checkStringToHash() {},
});
const userRepository = Container.get<IUserRepository>('user.repository');
const cryptoService = Container.get<ICryptoService>('crypto.service');
const loginByEmailQueryHandle = Container.get(LoginByEmailQueryHandle);
describe('User - Login by Email', () => {
    test('should successful if user exist with correct password', async () => {
        jest.spyOn(userRepository, 'getByEmail').mockReturnValue(
            Promise.resolve({
                id: 'any',
                email: 'any',
                password: 'any',
            } as User),
        );
        jest.spyOn(cryptoService, 'checkStringToHash').mockReturnValue(true);
        const user = await loginByEmailQueryHandle.handle({
            email: 'any',
            password: 'any',
        });
        expect(user).toEqual({ email: 'any' });
    });
    test('should return exception if password is wrong', async () => {
        jest.spyOn(userRepository, 'getByEmail').mockReturnValue(
            Promise.resolve({
                id: 'any',
                email: 'any',
                password: 'any',
            } as User),
        );
        jest.spyOn(cryptoService, 'checkStringToHash').mockReturnValue(false);
        const result = await loginByEmailQueryHandle
            .handle({
                email: 'any',
                password: 'any',
            })
            .catch(error => error);
        expect(result).toEqual(
            new SystemError(MessageError.PARAM_INVALID, 'password'),
        );
    });
    test('should return exception if email not exist', async () => {
        jest.spyOn(userRepository, 'getByEmail').mockReturnValue(
            Promise.resolve(null),
        );
        const result = await loginByEmailQueryHandle
            .handle({
                email: 'any',
                password: 'any',
            })
            .catch(error => error);
        expect(result).toEqual(new SystemError(MessageError.USER_NOT_FOUND));
    });
});
