'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ErrorMiddleware = void 0;
const tslib_1 = require('tslib');
const routing_controllers_1 = require('routing-controllers');
const Configuration_1 = require('../../config/Configuration');
const AccessDeniedError_1 = require('../../core/domain/common/exceptions/AccessDeniedError');
const InternalServerError_1 = require('../../core/domain/common/exceptions/InternalServerError');
let ErrorMiddleware = class ErrorMiddleware {
  error(err, req, res) {
    let errLog = err.stack || err.message;
    if (!Configuration_1.IS_DEVELOPMENT)
      errLog = errLog.replace(/\n/g, ' ').replace(/\s\s+/g, ' ');
    // Handle internal server error.
    if (!err.code || !err.httpCode) {
      req.log.error(errLog);
      err = new InternalServerError_1.InternalServerError();
    } else {
      req.log.warn(errLog);
      if (err.httpCode === 403)
        err = new AccessDeniedError_1.AccessDeniedError();
    }
    res.status(err.httpCode);
    res.send({
      code: err.code,
      message: err.message,
    });
  }
};
ErrorMiddleware = tslib_1.__decorate(
  [routing_controllers_1.Middleware({ type: 'after' })],
  ErrorMiddleware,
);
exports.ErrorMiddleware = ErrorMiddleware;
