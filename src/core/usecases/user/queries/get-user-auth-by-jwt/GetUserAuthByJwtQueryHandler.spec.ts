/* eslint-disable @typescript-eslint/no-empty-function */
import Container from 'typedi';
import {
    IAuthJwtService,
    IJwtPayloadExtend,
} from '../../../../services/auth/IAuthJwtService';
import { GetUserAuthByJwtQuery } from './GetUserAuthByJwtQuery';
import { GetUserAuthByJwtQueryHandle } from './GetUserAuthByJwtQueryHandler';
import { UnauthorizedError } from '../../../../domain/common/exceptions/UnauthorizedError';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';

Container.set('auth_jwt.service', {
    async verify() {},
});
const authJWTService = Container.get<IAuthJwtService>('auth_jwt.service');
const getUserAuthByJWTQueryHandle = Container.get(GetUserAuthByJwtQueryHandle);
describe('User - Get Auth by JWT', () => {
    test('should return user if token is valid', async () => {
        jest.spyOn(authJWTService, 'verify').mockReturnValue({
            userId: 'ANY',
        } as IJwtPayloadExtend);
        const param: GetUserAuthByJwtQuery = {
            roleIds: ['ANY'],
            token: 'ANY',
        };
        const result = await getUserAuthByJWTQueryHandle.handle(param);
        expect(result).toEqual({
            token: 'ANY',
            userId: 'ANY',
        });
    });

    test('should exception if param is not valid', async () => {
        jest.spyOn(authJWTService, 'verify').mockReturnValue({} as any);
        const param: GetUserAuthByJwtQuery = {
            roleIds: ['ANY'],
            token: 'ANY',
        };
        const result = await getUserAuthByJWTQueryHandle
            .handle(param)
            .catch(error => error);
        expect(result).toEqual(
            new UnauthorizedError(MessageError.PARAM_INVALID, 'token payload'),
        );
    });

    test('should exception if token is not valid', async () => {
        jest.spyOn(authJWTService, 'verify').mockImplementationOnce(() => {
            throw new Error();
        });
        const param: GetUserAuthByJwtQuery = {
            roleIds: ['ANY'],
            token: 'ANY',
        };
        const result = await getUserAuthByJWTQueryHandle
            .handle(param)
            .catch(error => error);
        expect(result).toEqual(
            new UnauthorizedError(MessageError.PARAM_INVALID, 'token'),
        );
    });

    test('should exception if expired token', async () => {
        jest.spyOn(authJWTService, 'verify').mockImplementationOnce(() => {
            const error = new Error();
            error.name = 'TokenExpiredError';
            throw error;
        });
        const param: GetUserAuthByJwtQuery = {
            roleIds: ['ANY'],
            token: 'ANY',
        };
        const result = await getUserAuthByJWTQueryHandle
            .handle(param)
            .catch(error => error);
        expect(result).toEqual(
            new UnauthorizedError(MessageError.PARAM_EXPIRED, 'token'),
        );
    });
});
