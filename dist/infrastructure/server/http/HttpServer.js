'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.HttpServer = void 0;
const routing_controllers_1 = require('routing-controllers');
class HttpServer {
  createApp(app, options) {
    this._app = routing_controllers_1.useExpressServer(app, options);
    return this._app;
  }
  start(port, callback) {
    this._server = this._app.listen(port, '0.0.0.0', callback);
    return this._server;
  }
}
exports.HttpServer = HttpServer;
