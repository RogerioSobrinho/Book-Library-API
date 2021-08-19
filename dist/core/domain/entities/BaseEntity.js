'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BaseEntity = void 0;
class BaseEntity {
  constructor(data = {}) {
    this.data = data;
  }
  get createdAt() {
    return this.data.createdAt;
  }
  get updatedAt() {
    return this.data.updatedAt;
  }
  /* Handlers */
  toData() {
    return this.data;
  }
}
exports.BaseEntity = BaseEntity;
