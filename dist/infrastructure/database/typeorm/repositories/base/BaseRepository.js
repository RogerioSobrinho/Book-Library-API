'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BaseRepository = void 0;
const tslib_1 = require('tslib');
const typedi_1 = require('typedi');
const typeorm_1 = require('typeorm');
class BaseRepository {
  constructor(_type, _schema) {
    this._type = _type;
    this._schema = _schema;
    this.repository = typeorm_1.getRepository(this._type);
  }
  count() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      return yield this.repository
        .createQueryBuilder(this._schema.TABLE_NAME)
        .getCount();
    });
  }
  getById(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const result = yield this.repository
        .createQueryBuilder(this._schema.TABLE_NAME)
        .whereInIds(id)
        .getOne();
      return result ? result.toEntity() : null;
    });
  }
  create(data) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const result = yield this.repository
        .createQueryBuilder(this._schema.TABLE_NAME)
        .insert()
        .values(new this._type().fromEntity(data))
        .execute();
      return (
        result.identifiers &&
        result.identifiers.length &&
        result.identifiers[0].id
      );
    });
  }
  createGet(data) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const result = yield this.repository
        .createQueryBuilder(this._schema.TABLE_NAME)
        .insert()
        .values(new this._type().fromEntity(data))
        .execute();
      const id =
        result.identifiers &&
        result.identifiers.length &&
        result.identifiers[0].id;
      if (!id) return null;
      return yield this.getById(id);
    });
  }
  createMultiple(list) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const result = yield this.repository
        .createQueryBuilder(this._schema.TABLE_NAME)
        .insert()
        .values(list.map((item) => new this._type().fromEntity(item)))
        .execute();
      return result.identifiers && result.identifiers.length
        ? result.identifiers.map((identifier) => identifier.id)
        : [];
    });
  }
  update(id, data) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const result = yield this.repository
        .createQueryBuilder(this._schema.TABLE_NAME)
        .update(new this._type().fromEntity(data))
        .whereInIds(id)
        .execute();
      return !!result.affected;
    });
  }
  updateGet(id, data) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const result = yield this.repository
        .createQueryBuilder(this._schema.TABLE_NAME)
        .update(new this._type().fromEntity(data))
        .whereInIds(id)
        .execute();
      const hasSucceed = !!result.affected;
      if (!hasSucceed) return null;
      return yield this.getById(id);
    });
  }
  delete(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const result = yield this.repository
        .createQueryBuilder(this._schema.TABLE_NAME)
        .delete()
        .whereInIds(id)
        .execute();
      return !!result.affected;
    });
  }
  deleteMultiple(ids) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const result = yield this.repository
        .createQueryBuilder(this._schema.TABLE_NAME)
        .delete()
        .whereInIds(ids)
        .execute();
      return !!result.affected && result.affected === ids.length;
    });
  }
}
tslib_1.__decorate(
  [typedi_1.Inject('db.context'), tslib_1.__metadata('design:type', Object)],
  BaseRepository.prototype,
  'dbContext',
  void 0,
);
exports.BaseRepository = BaseRepository;
