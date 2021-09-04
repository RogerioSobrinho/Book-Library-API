/* eslint-disable @typescript-eslint/no-empty-function */
import Container from 'typedi';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';
import { User } from '../../../../domain/entities/User';
import { RoleId } from '../../../../domain/enums/role/RoleId';
import { IUserRepository } from '../../../../repositories/user/IUserRepository';
import { IAuthJwtService } from '../../../../services/auth/IAuthJwtService';
import { ICryptoService } from '../../../../services/crypto/ICryptoService';
import { CreateUserCommandHandle } from './CreateUserCommandHandle';

Container.set('user.repository', {
    async createGet() {},
    async getByEmail() {},
});
Container.set('crypto.service', {
    async generateHash() {},
});
Container.set('auth_jwt.service', {
    async sign() {},
});

const jwtService = Container.get<IAuthJwtService>('auth_jwt.service');
const cryptoService = Container.get<ICryptoService>('crypto.service');
const userRepository = Container.get<IUserRepository>('user.repository');
const createUserCommandHandle = Container.get(CreateUserCommandHandle);
describe('User - Create User', () => {
    test('should create a new user', async () => {
        const newUser = {
            id: 'ANY',
            role: RoleId.CLIENT,
            email: 'any@any.com',
            password: '123456',
        } as User;
        jest.spyOn(userRepository, 'getByEmail').mockReturnValue(
            Promise.resolve(null),
        );
        jest.spyOn(userRepository, 'createGet').mockReturnValue(
            Promise.resolve(newUser),
        );
        jest.spyOn(cryptoService, 'generateHash').mockReturnValue(
            Promise.resolve('#####'),
        );
        jest.spyOn(jwtService, 'sign').mockReturnValue('ANY');
        const result = await createUserCommandHandle.handle(newUser);
        expect(result).toEqual({
            token: 'ANY',
            userId: 'ANY',
        });
    });

    test('should return expection if try create a new user without email and password', async () => {
        const result = await createUserCommandHandle
            .handle({
                email: null,
                role: RoleId.CLIENT,
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

    test('should return exception if try to create a new user with email existing', async () => {
        jest.spyOn(userRepository, 'getByEmail').mockReturnValue(
            Promise.resolve({
                id: 'any',
                role: RoleId.CLIENT,
                email: 'any@any.com',
                password: 'any',
            } as User),
        );
        const result = await createUserCommandHandle
            .handle({
                email: 'any@any.com',
                role: RoleId.CLIENT,
                password: 'any',
            })
            .catch(error => error);
        expect(result).toEqual(
            new SystemError(MessageError.PARAM_EXISTED, 'email'),
        );
    });
});
