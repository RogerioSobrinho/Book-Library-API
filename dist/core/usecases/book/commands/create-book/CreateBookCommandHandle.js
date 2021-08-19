'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CreateBookCommandHandler = void 0;
const tslib_1 = require('tslib');
const typedi_1 = require('typedi');
const MessageError_1 = require('../../../../domain/common/exceptions/message/MessageError');
const SystemError_1 = require('../../../../domain/common/exceptions/SystemError');
const Book_1 = require('../../../../domain/entities/Book');
let CreateBookCommandHandler = class CreateBookCommandHandler {
  handle(param) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const data = new Book_1.Book();
      data.author = param.author;
      data.description = param.description;
      data.language = param.language;
      data.name = param.name;
      data.publishAt = param.publishAt;
      data.startReadAt = param.startReadAt;
      data.finishReadAt = param.finishReadAt;
      const book = yield this._bookRepository.createGet(data);
      if (!book)
        throw new SystemError_1.SystemError(
          MessageError_1.MessageError.DATA_CANNOT_SAVE,
          'Book',
        );
      return book;
    });
  }
};
tslib_1.__decorate(
  [
    typedi_1.Inject('book.repository'),
    tslib_1.__metadata('design:type', Object),
  ],
  CreateBookCommandHandler.prototype,
  '_bookRepository',
  void 0,
);
CreateBookCommandHandler = tslib_1.__decorate(
  [typedi_1.Service()],
  CreateBookCommandHandler,
);
exports.CreateBookCommandHandler = CreateBookCommandHandler;
