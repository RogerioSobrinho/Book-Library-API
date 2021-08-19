'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.SystemError = void 0;
const common_1 = require('../../../../common');
class SystemError extends Error {
  constructor(errObj, ...params) {
    super();
    this.httpCode = 400;
    this.code = errObj.code;
    this.message =
      params && params.length
        ? common_1.mapTemplate(errObj.message, ...params)
        : errObj.message;
  }
}
exports.SystemError = SystemError;
