import * as path from 'path';
import { ConnectionOptions } from 'typeorm';
import {
    DB_HOST,
    DB_NAME,
    DB_PASS,
    DB_PORT,
    DB_TYPE,
    DB_USER,
    IS_DEVELOPMENT,
} from './Configuration';

export default {
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASS,
    synchronize: true,
    logging: IS_DEVELOPMENT,
    entities: [
        path.join(
            __dirname,
            '../infrastructure/database/typeorm/entities/**/*{.js,.ts}',
        ),
    ],
} as ConnectionOptions;
