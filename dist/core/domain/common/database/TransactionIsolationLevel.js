'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TransactionIsolationLevel = void 0;
var TransactionIsolationLevel;
(function (TransactionIsolationLevel) {
  TransactionIsolationLevel['READ_UNCOMMITTED'] = 'READ UNCOMMITTED';
  TransactionIsolationLevel['READ_COMMITTED'] = 'READ COMMITTED';
  TransactionIsolationLevel['REPEATABLE_READ'] = 'REPEATABLE READ';
  TransactionIsolationLevel['SERIALIZABLE'] = 'SERIALIZABLE';
})(
  (TransactionIsolationLevel =
    exports.TransactionIsolationLevel ||
    (exports.TransactionIsolationLevel = {})),
);
