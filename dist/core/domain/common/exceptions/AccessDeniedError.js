'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AccessDeniedError = void 0;
const MessageError_1 = require('./message/MessageError');
class AccessDeniedError extends Error {
  constructor() {
    super();
    this.httpCode = 403;
    this.code = MessageError_1.MessageError.ACCESS_DENIED.code;
    this.message = MessageError_1.MessageError.ACCESS_DENIED.message;
  }
}
exports.AccessDeniedError = AccessDeniedError;
