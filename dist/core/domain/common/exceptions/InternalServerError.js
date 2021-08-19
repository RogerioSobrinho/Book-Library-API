'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.InternalServerError = void 0;
const MessageError_1 = require('./message/MessageError');
class InternalServerError extends Error {
  constructor() {
    super();
    this.httpCode = 500;
    this.code = MessageError_1.MessageError.SOMETHING_WRONG.code;
    this.message = MessageError_1.MessageError.SOMETHING_WRONG.message;
  }
}
exports.InternalServerError = InternalServerError;
