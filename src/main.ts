import './infrastructure/SingletonRegister';
import Container from 'typedi';
import { API_PORT } from './config/Configuration';
import { IDbContext } from './core/domain/common/database/interfaces/IDbContext';
import { ApiService } from './presentation/ApiService';

const dbContext = Container.get<IDbContext>('db.context');

const startApplication = async () => {
    await dbContext.createConnection();
    new ApiService().setup();
};
startApplication()
    .then(() => {
        console.info(
            `Server started at \x1b[32m http://localhost:${API_PORT} \x1b[0m`,
        );
    })
    .catch(() => {
        dbContext.destroyConnection();
        setTimeout(() => process.exit(), 2000);
    });
