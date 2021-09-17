import './infrastructure/SingletonRegister';
import Container from 'typedi';
import { API_PORT, DOMAIN, PROTOTYPE } from './config/Configuration';
import { IDbContext } from './core/domain/common/database/interfaces/IDbContext';
import { ApiService } from './presentation/ApiService';

const dbContext = Container.get<IDbContext>('db.context');

const startApplication = async () => {
    await dbContext.createConnection();
    new ApiService().setup();
};
startApplication()
    .then(() => {
        console.log(`
        ################################################
            🏁  Server listening at: \x1b[32m ${PROTOTYPE}://${DOMAIN}:${API_PORT} \x1b[0m 🏁
        ################################################`);
    })
    .catch(error => {
        console.error(error);
        dbContext.destroyConnection();
    });
