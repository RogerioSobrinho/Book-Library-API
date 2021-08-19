import { Response } from 'express';
import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from 'routing-controllers';
import { IS_DEVELOPMENT } from '../../config/Configuration';
import { AccessDeniedError } from '../../core/domain/common/exceptions/AccessDeniedError';
import { SystemError } from '../../core/domain/common/exceptions/SystemError';
import { InternalServerError } from '../../core/domain/common/exceptions/InternalServerError';
import { IRequest } from '../../core/domain/common/IRequest';

@Middleware({ type: 'after' })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error(err: SystemError, req: IRequest, res: Response) {
    let errLog = err.stack || err.message;
    if (!IS_DEVELOPMENT)
      errLog = errLog.replace(/\n/g, ' ').replace(/\s\s+/g, ' ');

    // Handle internal server error.
    if (!err.code || !err.httpCode) {
      req.log.error(errLog);
      err = new InternalServerError();
    } else {
      req.log.warn(errLog);
      if (err.httpCode === 403) err = new AccessDeniedError();
    }

    res.status(err.httpCode);
    res.send({
      code: err.code,
      message: err.message,
    });
  }
}
