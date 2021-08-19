'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BodyParserMiddleware = void 0;
const tslib_1 = require('tslib');
const express_1 = require('express');
const routing_controllers_1 = require('routing-controllers');
let BodyParserMiddleware = class BodyParserMiddleware {
  constructor() {
    this._jsonBodyParser = express_1.json();
  }
  use(req, res, next) {
    console.log('aqui ###############################');
    this._jsonBodyParser(req, res, next);
  }
};
BodyParserMiddleware = tslib_1.__decorate(
  [
    routing_controllers_1.Middleware({ type: 'before', priority: 5 }),
    tslib_1.__metadata('design:paramtypes', []),
  ],
  BodyParserMiddleware,
);
exports.BodyParserMiddleware = BodyParserMiddleware;
