import { BASE_SCHEMA } from '../base/BaseSchema';

export const USER_SCHEMA = {
    TABLE_NAME: 'users',
    COLUMNS: {
        ...BASE_SCHEMA.COLUMNS,
        ID: 'id',
        EMAIL: 'email',
        PASSWORD: 'password',
    },
    RELATED_ONE: {},
    RELATED_MANY: {},
};
