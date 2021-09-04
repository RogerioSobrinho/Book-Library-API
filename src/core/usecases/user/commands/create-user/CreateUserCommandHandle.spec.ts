/* eslint-disable @typescript-eslint/no-empty-function */
import Container from 'typedi';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';
import { User } from '../../../../domain/entities/User';
import { IUserRepository } from '../../../../repositories/user/IUserRepository';
import { ICryptoService } from '../../../../services/crypto/ICryptoService';
import { CreateUserCommandHandle } from './CreateUserCommandHandle';

Container.set('user.repository', {
    async createGet() {},
    async getByEmail() {},
});
Container.set('crypto.service', {
    async generateHash() {},
});
const cryptoService = Container.get<ICryptoService>('crypto.service');
const userRepository = Container.get<IUserRepository>('user.repository');
const createUserCommandHandle = Container.get(CreateUserCommandHandle);
describe('User - Create User', () => {
    test('should create a new user', async () => {
        const newUser = {
            email: 'any@any.com',
            password: '123456',
        } as User;
        jest.spyOn(userRepository, 'getByEmail').mockReturnValue(
            Promise.resolve(null),
        );
        jest.spyOn(userRepository, 'createGet').mockReturnValue(
            Promise.resolve(newUser),
        );
        jest.spyOn(cryptoService, 'generateHash').mockReturnValue('#####');
        const result = await createUserCommandHandle.handle(newUser);
        expect(result).toEqual({
            email: 'any@any.com',
        });
    });

    test('should return expection if try create a new user without email and password', async () => {
        const result = await createUserCommandHandle
            .handle({
                email: null,
                password: null,
            })
            .catch(error => error);
        expect(result).toEqual(
            new SystemError(
                MessageError.PARAM_IS_REQUIRED,
                'email and password',
            ),
        );
    });

    test('should return expection if fail to create a new user', async () => {
        jest.spyOn(userRepository, 'createGet').mockReturnValue(
            Promise.reject(null),
        );
        jest.spyOn(userRepository, 'getByEmail').mockReturnValue(
            Promise.resolve(null),
        );
        jest.spyOn(cryptoService, 'generateHash').mockReturnValue('#####');
        const result = await createUserCommandHandle
            .handle({
                email: 'any@any.com',
                password: 'any',
            })
            .catch(error => error);
        expect(result).toEqual(new SystemError(MessageError.DATA_CANNOT_SAVE));
    });

    test('should return exception if try to create a new user with email existing', async () => {
        jest.spyOn(userRepository, 'getByEmail').mockReturnValue(
            Promise.resolve({
                id: 'any',
                email: 'any@any.com',
                password: 'any',
            } as User),
        );
        const result = await createUserCommandHandle
            .handle({
                email: 'any@any.com',
                password: 'any',
            })
            .catch(error => error);
        expect(result).toEqual(
            new SystemError(MessageError.PARAM_EXISTED, 'email'),
        );
    });
});
