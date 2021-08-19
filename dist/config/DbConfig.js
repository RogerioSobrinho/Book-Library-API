'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const path = tslib_1.__importStar(require('path'));
const Configuration_1 = require('./Configuration');
exports.default = {
  type: Configuration_1.DB_TYPE,
  host: Configuration_1.DB_HOST,
  port: Configuration_1.DB_PORT,
  database: Configuration_1.DB_NAME,
  username: Configuration_1.DB_USER,
  password: Configuration_1.DB_PASS,
  synchronize: true,
  logging: Configuration_1.IS_DEVELOPMENT,
  entities: [
    path.join(
      __dirname,
      '../infrastructure/database/typeorm/entities/**/*{.js,.ts}',
    ),
  ],
};
