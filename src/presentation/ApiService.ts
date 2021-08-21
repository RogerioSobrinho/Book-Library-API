import express from 'express';
import * as swaggerUiExpress from 'swagger-ui-express';
import * as path from 'path';
import { Server } from 'http';
import { RoutingControllersOptions } from 'routing-controllers';
import { HttpServer } from '../infrastructure/server/http/HttpServer';
import { API_PORT, IS_DEVELOPMENT } from '../config/Configuration';
import { ApiDocument } from './ApiDocument';

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
            cors: {
                origin: '*',
                methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
                allowedHeaders: ['Origin', 'Content-Type', 'Accept'],
                maxAge: 3600,
                preflightContinue: true,
                optionsSuccessStatus: 204,
            },
            routePrefix: '/api',
            controllers: [path.join(__dirname, './controllers/**/*{.js,.ts}')],
            middlewares: [path.join(__dirname, './middlewares/*{.js,.ts}')],
            validation: false,
            defaultErrorHandler: false,
            classTransformer: true,
            development: IS_DEVELOPMENT,
        };

        const httpServer = new HttpServer();
        httpServer.createApp(app, options);

        const spec = new ApiDocument(options).generate();
        app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

        return httpServer.start(API_PORT);
    }
}
