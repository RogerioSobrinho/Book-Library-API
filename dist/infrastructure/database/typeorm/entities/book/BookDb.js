'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookDb = void 0;
const tslib_1 = require('tslib');
const typeorm_1 = require('typeorm');
const Book_1 = require('../../../../../core/domain/entities/Book');
const BookSchema_1 = require('../../schemas/book/BookSchema');
const BaseDBEntity_1 = require('../base/BaseDBEntity');
let BookDb = class BookDb extends BaseDBEntity_1.BaseDbEntity {
  toEntity() {
    return new Book_1.Book(this);
  }
  fromEntity(entity) {
    return entity.toData();
  }
};
tslib_1.__decorate(
  [
    typeorm_1.PrimaryGeneratedColumn('uuid', {
      name: BookSchema_1.BOOK_SCHEMA.COLUMNS.ID,
    }),
    tslib_1.__metadata('design:type', Number),
  ],
  BookDb.prototype,
  'id',
  void 0,
);
tslib_1.__decorate(
  [
    typeorm_1.Column('varchar', {
      name: BookSchema_1.BOOK_SCHEMA.COLUMNS.NAME,
      length: 120,
    }),
    tslib_1.__metadata('design:type', String),
  ],
  BookDb.prototype,
  'name',
  void 0,
);
tslib_1.__decorate(
  [
    typeorm_1.Column('varchar', {
      name: BookSchema_1.BOOK_SCHEMA.COLUMNS.DESCRIPTION,
      length: 195,
    }),
    tslib_1.__metadata('design:type', String),
  ],
  BookDb.prototype,
  'description',
  void 0,
);
tslib_1.__decorate(
  [
    typeorm_1.Column('varchar', {
      name: BookSchema_1.BOOK_SCHEMA.COLUMNS.AUTHOR,
      length: 80,
    }),
    tslib_1.__metadata('design:type', String),
  ],
  BookDb.prototype,
  'author',
  void 0,
);
tslib_1.__decorate(
  [
    typeorm_1.Column('date', {
      name: BookSchema_1.BOOK_SCHEMA.COLUMNS.PUBLISHAT,
    }),
    tslib_1.__metadata('design:type', Date),
  ],
  BookDb.prototype,
  'publishAt',
  void 0,
);
tslib_1.__decorate(
  [
    typeorm_1.Column('varchar', {
      name: BookSchema_1.BOOK_SCHEMA.COLUMNS.LANGUAGE,
      length: 80,
    }),
    tslib_1.__metadata('design:type', String),
  ],
  BookDb.prototype,
  'language',
  void 0,
);
tslib_1.__decorate(
  [
    typeorm_1.Column('date', {
      name: BookSchema_1.BOOK_SCHEMA.COLUMNS.STARTREADAT,
    }),
    tslib_1.__metadata('design:type', Date),
  ],
  BookDb.prototype,
  'startReadAt',
  void 0,
);
tslib_1.__decorate(
  [
    typeorm_1.Column('date', {
      name: BookSchema_1.BOOK_SCHEMA.COLUMNS.FINISHREADAT,
    }),
    tslib_1.__metadata('design:type', Date),
  ],
  BookDb.prototype,
  'finishReadAt',
  void 0,
);
BookDb = tslib_1.__decorate(
  [typeorm_1.Entity(BookSchema_1.BOOK_SCHEMA.TABLE_NAME)],
  BookDb,
);
exports.BookDb = BookDb;
