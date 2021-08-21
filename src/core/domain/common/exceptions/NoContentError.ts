import { MessageError } from './message/MessageError';

export class NoContentError extends Error {
    code: string;
    httpCode: number;

    constructor() {
        super();
        this.httpCode = 204;
        this.code = MessageError.DATA_NOT_FOUND.code;
        this.message = MessageError.DATA_NOT_FOUND.message;
    }
}
