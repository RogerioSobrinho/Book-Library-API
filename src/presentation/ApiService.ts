import express from 'express';
import * as path from 'path';
import { Server } from 'http';
import { RoutingControllersOptions } from 'routing-controllers';
import { HttpServer } from '../infrastructure/server/http/HttpServer';
import { API_PORT, IS_DEVELOPMENT } from '../config/Configuration';

export class ApiService {
  setup(): Server {
    const app = express();
    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: true,
      }),
    );
    app.get('/probe', (_req, res) => {
      res.status(200).end('ok');
    });

    const options: RoutingControllersOptions = {
      cors: true,
      routePrefix: '/api',
      controllers: [path.join(__dirname, './controllers/**/*{.js,.ts}')],
      validation: false,
      defaultErrorHandler: false,
      development: IS_DEVELOPMENT,
    };

    const httpServer = new HttpServer();
    httpServer.createApp(app, options);

    return httpServer.start(API_PORT);
  }
}
