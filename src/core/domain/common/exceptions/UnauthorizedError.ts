import { mapTemplate } from '../../../../common';
import { ErrorObject } from './message/ErrorObject';

export class UnauthorizedError extends Error {
    code: string;
    httpCode: number;

    constructor(errObj: ErrorObject, ...params) {
        super();
        this.httpCode = 401;
        this.code = errObj.code;
        this.message =
            params && params.length
                ? mapTemplate(errObj.message, ...params)
                : errObj.message;
    }
}
