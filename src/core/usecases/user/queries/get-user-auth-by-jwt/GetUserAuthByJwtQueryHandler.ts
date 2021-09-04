import { Inject, Service } from 'typedi';
import { GetUserAuthByJwtQuery } from './GetUserAuthByJwtQuery';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { UnauthorizedError } from '../../../../domain/common/exceptions/UnauthorizedError';
import { GetUserAuthByJwtQueryResult } from './GetUserAuthByJwtQueryResult';
import { IQueryHandler } from '../../../../domain/common/usecases/interfaces/IQueryHandler';
import { IAuthJwtService } from '../../../../services/auth/IAuthJwtService';

@Service()
export class GetUserAuthByJwtQueryHandle
    implements
        IQueryHandler<GetUserAuthByJwtQuery, GetUserAuthByJwtQueryResult>
{
    @Inject('auth_jwt.service')
    private readonly _authJwtService: IAuthJwtService;

    async handle(
        param: GetUserAuthByJwtQuery,
    ): Promise<GetUserAuthByJwtQueryResult> {
        if (!param.token)
            throw new UnauthorizedError(MessageError.PARAM_REQUIRED, 'token');

        let payload;
        try {
            payload = this._authJwtService.verify(param.token);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedError(
                    MessageError.PARAM_EXPIRED,
                    'token',
                );
            } else {
                throw new UnauthorizedError(
                    MessageError.PARAM_INVALID,
                    'token',
                );
            }
        }

        if (!payload || !payload.userId) {
            throw new UnauthorizedError(
                MessageError.PARAM_INVALID,
                'token payload',
            );
        }

        return new GetUserAuthByJwtQueryResult(param.token, payload.userId);
    }
}
