import { Response } from 'express';
import {
    ExpressErrorMiddlewareInterface,
    Middleware,
} from 'routing-controllers';
import { AccessDeniedError } from '../../core/domain/common/exceptions/AccessDeniedError';
import { SystemError } from '../../core/domain/common/exceptions/SystemError';
import { InternalServerError } from '../../core/domain/common/exceptions/InternalServerError';

@Middleware({ type: 'after' })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
    error(err: SystemError, _: Request, res: Response) {
        // Handle internal server error.
        if (!err.code || !err.httpCode) err = new InternalServerError();
        else if (err.httpCode === 403) err = new AccessDeniedError();

        res.status(err.httpCode);
        res.send({
            code: err.code,
            message: err.message,
        });
    }
}
