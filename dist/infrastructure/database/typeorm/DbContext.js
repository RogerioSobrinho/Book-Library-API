'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DbContext = void 0;
const tslib_1 = require('tslib');
const typedi_1 = require('typedi');
const typeorm_1 = require('typeorm');
const SystemError_1 = require('../../../core/domain/common/exceptions/SystemError');
const MessageError_1 = require('../../../core/domain/common/exceptions/message/MessageError');
const DbConfig_1 = tslib_1.__importDefault(require('../../../config/DbConfig'));
let DbContext = class DbContext {
  getConnection(connectionName) {
    let connection = null;
    try {
      connection = typeorm_1.getConnection(connectionName);
      // eslint-disable-next-line no-empty
    } catch (_a) {}
    if (!connection || !connection.isConnected)
      throw new SystemError_1.SystemError(
        MessageError_1.MessageError.PARAM_NOT_EXISTS,
        'database connection',
      );
    return connection;
  }
  createConnection(connectionName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      let connection = null;
      try {
        connection = typeorm_1.getConnection(connectionName);
        // eslint-disable-next-line no-empty
      } catch (_a) {}
      if (connection && connection.isConnected) return connection;
      connection = yield typeorm_1
        .createConnection(
          Object.assign(Object.assign({}, DbConfig_1.default), {
            name: connectionName,
          }),
        )
        .then((connection) => connection)
        .catch(() => {
          throw new SystemError_1.SystemError(
            MessageError_1.MessageError.CONNECTION_ERROR,
          );
        });
      return connection;
    });
  }
  destroyConnection(connectionName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      let connection = null;
      try {
        connection = typeorm_1.getConnection(connectionName);
        // eslint-disable-next-line no-empty
      } catch (_a) {}
      if (connection && connection.isConnected) yield connection.close();
    });
  }
};
DbContext = tslib_1.__decorate([typedi_1.Service('db.context')], DbContext);
exports.DbContext = DbContext;
