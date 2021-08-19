'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookRepository = void 0;
const tslib_1 = require('tslib');
const typedi_1 = require('typedi');
const SortType_1 = require('../../../../../core/domain/common/database/SortType');
const BookDb_1 = require('../../entities/book/BookDb');
const BookSchema_1 = require('../../schemas/book/BookSchema');
const BaseRepository_1 = require('../base/BaseRepository');
let BookRepository = class BookRepository extends BaseRepository_1.BaseRepository {
  constructor() {
    super(BookDb_1.BookDb, BookSchema_1.BOOK_SCHEMA);
  }
  getByFilter(data) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const list = yield this.repository
        .createQueryBuilder(BookSchema_1.BOOK_SCHEMA.TABLE_NAME)
        .orderBy(
          `${BookSchema_1.BOOK_SCHEMA.TABLE_NAME}.${BookSchema_1.BOOK_SCHEMA.COLUMNS.NAME}`,
          SortType_1.SortType.ASC,
        )
        .whereInIds(data.id)
        .getMany();
      return list.map((item) => item.toEntity());
    });
  }
};
BookRepository = tslib_1.__decorate(
  [
    typedi_1.Service('book.repository'),
    tslib_1.__metadata('design:paramtypes', []),
  ],
  BookRepository,
);
exports.BookRepository = BookRepository;
