import {
    getMetadataArgsStorage,
    RoutingControllersOptions,
} from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { API_PORT, HOSTNAME, PROJECT_NAME } from '../config/Configuration';

export class ApiDocument {
    constructor(private readonly _options: RoutingControllersOptions) {}

    generate() {
        const storage = getMetadataArgsStorage();

        return routingControllersToSpec(storage, this._options, {
            info: {
                title: `${PROJECT_NAME} API`,
                description: '',
                version: '1.0.0',
                contact: {
                    name: 'Rogerio Sobrinho',
                },
            },
            servers: [
                {
                    url: `http://${HOSTNAME}:${API_PORT}`,
                    description: `${HOSTNAME}`,
                },
            ],
            components: {},
        });
    }
}
