'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BOOK_SCHEMA = void 0;
const BaseSchema_1 = require('../base/BaseSchema');
exports.BOOK_SCHEMA = {
  TABLE_NAME: 'book',
  COLUMNS: Object.assign(Object.assign({}, BaseSchema_1.BASE_SCHEMA.COLUMNS), {
    ID: 'id',
    NAME: 'name',
    DESCRIPTION: 'description',
    AUTHOR: 'author',
    PUBLISHAT: 'publish_at',
    LANGUAGE: 'language',
    STARTREADAT: 'start_read_at',
    FINISHREADAT: 'finish_read_at',
  }),
  RELATED_ONE: {},
  RELATED_MANY: {},
};
