'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
require('./infrastructure/SingletonRegister');
const typedi_1 = tslib_1.__importDefault(require('typedi'));
const Configuration_1 = require('./config/Configuration');
const ApiService_1 = require('./presentation/ApiService');
const dbContext = typedi_1.default.get('db.context');
const startApplication = () =>
  tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield dbContext.createConnection();
    new ApiService_1.ApiService().setup();
  });
startApplication()
  .then(() => {
    console.info(
      `Server started at \x1b[32m http://localhost:${Configuration_1.API_PORT} \x1b[0m`,
    );
  })
  .catch(() => {
    dbContext.destroyConnection();
    setTimeout(() => process.exit(), 2000);
  });
