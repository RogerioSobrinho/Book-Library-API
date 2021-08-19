'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BaseDbEntity = void 0;
const tslib_1 = require('tslib');
const typeorm_1 = require('typeorm');
const BaseSchema_1 = require('../../schemas/base/BaseSchema');
class BaseDbEntity {}
tslib_1.__decorate(
  [
    typeorm_1.CreateDateColumn({
      name: BaseSchema_1.BASE_SCHEMA.COLUMNS.CREATED_AT,
      type: 'timestamptz',
    }),
    tslib_1.__metadata('design:type', Date),
  ],
  BaseDbEntity.prototype,
  'createdAt',
  void 0,
);
tslib_1.__decorate(
  [
    typeorm_1.UpdateDateColumn({
      name: BaseSchema_1.BASE_SCHEMA.COLUMNS.UPDATED_AT,
      type: 'timestamptz',
    }),
    tslib_1.__metadata('design:type', Date),
  ],
  BaseDbEntity.prototype,
  'updatedAt',
  void 0,
);
exports.BaseDbEntity = BaseDbEntity;
