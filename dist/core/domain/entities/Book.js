'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Book = void 0;
const BaseEntity_1 = require('./BaseEntity');
class Book extends BaseEntity_1.BaseEntity {
  constructor(data) {
    super(data);
  }
  get id() {
    return this.data.id;
  }
  set id(value) {
    this.data.id = value;
  }
  get name() {
    return this.data.name;
  }
  set name(value) {
    this.data.name = value;
  }
  get description() {
    return this.data.description;
  }
  set description(value) {
    this.data.description = value;
  }
  get author() {
    return this.data.author;
  }
  set author(value) {
    this.data.author = value;
  }
  get publishAt() {
    return this.data.publishAt;
  }
  set publishAt(value) {
    this.data.publishAt = value;
  }
  get language() {
    return this.data.language;
  }
  set language(value) {
    this.data.language = value;
  }
  get startReadAt() {
    return this.data.startReadAt;
  }
  set startReadAt(value) {
    this.data.startReadAt = value;
  }
  get finishReadAt() {
    return this.data.finishReadAt;
  }
  set finishReadAt(value) {
    this.data.finishReadAt = value;
  }
  /* Handlers */
  wasRead() {
    return (
      this.data.finishReadAt != null &&
      new Date(this.data.finishReadAt) <= new Date()
    );
  }
}
exports.Book = Book;
