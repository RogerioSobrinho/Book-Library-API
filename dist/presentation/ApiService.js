'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ApiService = void 0;
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const path = tslib_1.__importStar(require('path'));
const HttpServer_1 = require('../infrastructure/server/http/HttpServer');
const Configuration_1 = require('../config/Configuration');
class ApiService {
  setup() {
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(
      express_1.default.urlencoded({
        extended: true,
      }),
    );
    app.get('/probe', (_req, res) => {
      res.status(200).end('ok');
    });
    const options = {
      cors: true,
      routePrefix: '/api',
      controllers: [path.join(__dirname, './controllers/**/*{.js,.ts}')],
      validation: false,
      defaultErrorHandler: false,
      development: Configuration_1.IS_DEVELOPMENT,
    };
    const httpServer = new HttpServer_1.HttpServer();
    httpServer.createApp(app, options);
    return httpServer.start(Configuration_1.API_PORT);
  }
}
exports.ApiService = ApiService;
