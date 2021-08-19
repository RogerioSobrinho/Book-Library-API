'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FindAllBookByFilterQueryHandler = void 0;
const tslib_1 = require('tslib');
const typedi_1 = require('typedi');
const MessageError_1 = require('../../../../domain/common/exceptions/message/MessageError');
const SystemError_1 = require('../../../../domain/common/exceptions/SystemError');
const Book_1 = require('../../../../domain/entities/Book');
let FindAllBookByFilterQueryHandler = class FindAllBookByFilterQueryHandler {
  handle(param) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const data = new Book_1.Book();
      data.author = param.author;
      data.description = param.description;
      data.id = param.id;
      data.language = param.language;
      data.name = param.name;
      data.publishAt = param.publishAt;
      const books = yield this._bookRepository.getByFilter(data);
      if (!books)
        throw new SystemError_1.SystemError(
          MessageError_1.MessageError.DATA_NOT_FOUND,
          'Book',
        );
      return books;
    });
  }
};
tslib_1.__decorate(
  [
    typedi_1.Inject('book.repository'),
    tslib_1.__metadata('design:type', Object),
  ],
  FindAllBookByFilterQueryHandler.prototype,
  '_bookRepository',
  void 0,
);
FindAllBookByFilterQueryHandler = tslib_1.__decorate(
  [typedi_1.Service()],
  FindAllBookByFilterQueryHandler,
);
exports.FindAllBookByFilterQueryHandler = FindAllBookByFilterQueryHandler;
