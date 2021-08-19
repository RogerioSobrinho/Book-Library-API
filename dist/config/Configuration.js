'use strict';
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, '__esModule', { value: true });
exports.DB_PASS =
  exports.DB_USER =
  exports.DB_NAME =
  exports.DB_PORT =
  exports.DB_HOST =
  exports.DB_TYPE =
  exports.API_PORT =
  exports.IS_DEVELOPMENT =
    void 0;
const tslib_1 = require('tslib');
const dotenv = tslib_1.__importStar(require('dotenv'));
dotenv.config();
// SYSTEM ENVIRONMENT
exports.IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
// API SERVICE
exports.API_PORT =
  (_a = +process.env.API_PORT) !== null && _a !== void 0 ? _a : 8080;
// DATABASE CONFIGURATION
exports.DB_TYPE =
  (_b = process.env.DB_TYPE) !== null && _b !== void 0 ? _b : '';
exports.DB_HOST =
  (_c = process.env.DB_HOST) !== null && _c !== void 0 ? _c : '';
exports.DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 0;
exports.DB_NAME =
  (_d = process.env.DB_NAME) !== null && _d !== void 0 ? _d : '';
exports.DB_USER =
  (_e = process.env.DB_USER) !== null && _e !== void 0 ? _e : '';
exports.DB_PASS =
  (_f = process.env.DB_PASS) !== null && _f !== void 0 ? _f : '';
