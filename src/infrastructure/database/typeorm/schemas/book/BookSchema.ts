import { BASE_SCHEMA } from '../base/BaseSchema';

export const BOOK_SCHEMA = {
    TABLE_NAME: 'books',
    COLUMNS: {
        ...BASE_SCHEMA.COLUMNS,
        ID: 'id',
        USER_ID: 'userId',
        NAME: 'name',
        DESCRIPTION: 'description',
        PICTURE: 'picture',
        AUTHOR: 'author',
        PUBLISHAT: 'publish_at',
        LANGUAGE: 'language',
        STARTREADAT: 'start_read_at',
        FINISHREADAT: 'finish_read_at',
    },
    RELATED_ONE: {},
    RELATED_MANY: {},
};
