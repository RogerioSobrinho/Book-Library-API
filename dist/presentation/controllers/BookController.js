'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookController = void 0;
const tslib_1 = require('tslib');
const routing_controllers_1 = require('routing-controllers');
const typedi_1 = require('typedi');
const CreateBookCommand_1 = require('../../core/usecases/book/commands/create-book/CreateBookCommand');
const CreateBookCommandHandle_1 = require('../../core/usecases/book/commands/create-book/CreateBookCommandHandle');
const FindAllBookByFilterQuery_1 = require('../../core/usecases/book/queries/find-all-book-by-filter/FindAllBookByFilterQuery');
const FindAllBookByFilterQueryHandle_1 = require('../../core/usecases/book/queries/find-all-book-by-filter/FindAllBookByFilterQueryHandle');
const ErrorMiddleware_1 = require('../middlewares/ErrorMiddleware');
let BookController = class BookController {
  constructor(_createBookCommandHandler, _findallbookbyfilterQueryHandler) {
    this._createBookCommandHandler = _createBookCommandHandler;
    this._findallbookbyfilterQueryHandler = _findallbookbyfilterQueryHandler;
  }
  create(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      console.log('Controller', body);
      const result = yield this._createBookCommandHandler.handle(body);
      return result;
    });
  }
  findById(param) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const result = yield this._findallbookbyfilterQueryHandler.handle(param);
      return result;
    });
  }
};
tslib_1.__decorate(
  [
    routing_controllers_1.Post('/'),
    tslib_1.__param(0, routing_controllers_1.Body()),
    tslib_1.__metadata('design:type', Function),
    tslib_1.__metadata('design:paramtypes', [
      CreateBookCommand_1.CreateBookCommand,
    ]),
    tslib_1.__metadata('design:returntype', Promise),
  ],
  BookController.prototype,
  'create',
  null,
);
tslib_1.__decorate(
  [
    routing_controllers_1.Get('/:id([0-9])'),
    tslib_1.__param(0, routing_controllers_1.Params()),
    tslib_1.__metadata('design:type', Function),
    tslib_1.__metadata('design:paramtypes', [
      FindAllBookByFilterQuery_1.FindAllBookByFilterQuery,
    ]),
    tslib_1.__metadata('design:returntype', Promise),
  ],
  BookController.prototype,
  'findById',
  null,
);
BookController = tslib_1.__decorate(
  [
    typedi_1.Service(),
    routing_controllers_1.Controller('/book'),
    routing_controllers_1.UseAfter(ErrorMiddleware_1.ErrorMiddleware),
    tslib_1.__metadata('design:paramtypes', [
      CreateBookCommandHandle_1.CreateBookCommandHandler,
      FindAllBookByFilterQueryHandle_1.FindAllBookByFilterQueryHandler,
    ]),
  ],
  BookController,
);
exports.BookController = BookController;
