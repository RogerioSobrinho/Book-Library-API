import { Action } from 'routing-controllers';
import { Service } from 'typedi';
import { GetUserAuthByJwtQuery } from '../core/usecases/user/queries/get-user-auth-by-jwt/GetUserAuthByJwtQuery';
import { GetUserAuthByJwtQueryHandle } from '../core/usecases/user/queries/get-user-auth-by-jwt/GetUserAuthByJwtQueryHandler';

@Service()
export class ApiAuthenticator {
    constructor(
        private readonly _getUserAuthByJwtQueryHandle: GetUserAuthByJwtQueryHandle,
    ) {}

    authorizationHttpChecker = async (
        action: Action,
        roleIds: string[],
    ): Promise<boolean> => {
        const param = new GetUserAuthByJwtQuery();
        param.token = action.request.headers['authorization'];
        param.roleIds = roleIds;

        action.request.userAuth =
            await this._getUserAuthByJwtQueryHandle.handle(param);
        return !!action.request.userAuth;
    };

    userAuthChecker = (action: Action) => {
        return action.request.userAuth;
    };
}
