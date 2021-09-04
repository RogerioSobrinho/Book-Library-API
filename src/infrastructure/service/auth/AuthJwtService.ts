import * as jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import {
    DOMAIN,
    JWT_EXPIRES_IN,
    JWT_SECRET_KEY,
    JWT_SIGNATURE,
    PROJECT_NAME,
    PROTOTYPE,
} from '../../../config/Configuration';
import {
    IAuthJwtService,
    IJwtPayloadExtend,
} from '../../../core/services/auth/IAuthJwtService';

@Service('auth_jwt.service')
export class AuthJwtService implements IAuthJwtService {
    sign(userId: string): string {
        return jwt.sign(
            {
                userId,
            },
            JWT_SECRET_KEY,
            {
                expiresIn: JWT_EXPIRES_IN,
                issuer: PROJECT_NAME,
                audience: `${PROTOTYPE}://${DOMAIN}`,
                algorithm: JWT_SIGNATURE,
            } as jwt.SignOptions,
        );
    }

    verify(token: string): IJwtPayloadExtend {
        const splitToken = (token || '').split(' ');
        const tokenWithoutBearer =
            splitToken.length === 2 && splitToken[0] === 'Bearer'
                ? splitToken[1]
                : '';
        return jwt.verify(tokenWithoutBearer, JWT_SECRET_KEY, {
            issuer: PROJECT_NAME,
            audience: `${PROTOTYPE}://${DOMAIN}`,
            algorithm: JWT_SIGNATURE,
        } as jwt.VerifyOptions) as IJwtPayloadExtend;
    }
}
