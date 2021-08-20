import { Service } from 'typedi';
import { IDbContext } from '../../../core/domain/common/database/interfaces/IDbContext';
import { Connection, createConnection, getConnection } from 'typeorm';
import { SystemError } from '../../../core/domain/common/exceptions/SystemError';
import { MessageError } from '../../../core/domain/common/exceptions/message/MessageError';
import config from '../../../config/DbConfig';

@Service('db.context')
export class DbContext implements IDbContext {
    getConnection(connectionName?: string): Connection {
        let connection: Connection | null = null;
        try {
            connection = getConnection(connectionName);
            // eslint-disable-next-line no-empty
        } catch {}
        if (!connection || !connection.isConnected) {
            throw new SystemError(
                MessageError.PARAM_NOT_EXISTS,
                'database connection',
            );
        }
        return connection;
    }

    async createConnection(connectionName?: string): Promise<Connection> {
        let connection: Connection | null = null;
        try {
            connection = getConnection(connectionName);
            // eslint-disable-next-line no-empty
        } catch {}
        if (connection && connection.isConnected) return connection;
        connection = await createConnection({ ...config, name: connectionName })
            .then(connection => connection)
            .catch(() => {
                throw new SystemError(MessageError.CONNECTION_ERROR);
            });
        return connection;
    }

    async destroyConnection(connectionName?: string): Promise<void> {
        let connection: Connection | null = null;
        try {
            connection = getConnection(connectionName);
            // eslint-disable-next-line no-empty
        } catch {}
        if (connection && connection.isConnected) await connection.close();
    }
}
