import { MessageError } from '../common/exceptions/message/MessageError';
import { SystemError } from '../common/exceptions/SystemError';
import { IBook } from '../types/IBook';
import { BaseEntity } from './BaseEntity';

export class Book extends BaseEntity<IBook> implements IBook {
    constructor(data?: IBook) {
        super(data);
    }

    public get id(): string {
        return this.data.id;
    }

    public set id(value: string) {
        this.data.id = value;
    }

    public get name(): string {
        return this.data.name;
    }

    public set name(value: string) {
        this.data.name = value;
    }

    public get description(): string {
        return this.data.description;
    }

    public set description(value: string) {
        this.data.description = value;
    }

    public get picture(): string {
        return this.data.picture;
    }

    public set picture(value: string) {
        this.data.picture = value;
    }

    public get author(): string {
        return this.data.author;
    }

    public set author(value: string) {
        this.data.author = value;
    }

    public get publishAt(): Date {
        return this.data.publishAt;
    }

    public set publishAt(value: Date) {
        this.data.publishAt = value;
    }

    public get language(): string {
        return this.data.language;
    }

    public set language(value: string) {
        this.data.language = value;
    }

    public get startReadAt(): Date {
        return this.data.startReadAt;
    }

    public set startReadAt(value: Date) {
        this.data.startReadAt = value;
    }

    public get finishReadAt(): Date {
        return this.data.finishReadAt;
    }

    public set finishReadAt(value: Date) {
        this.data.finishReadAt = value;
    }

    get userId(): string {
        return this.data.userId;
    }

    set userId(value: string) {
        if (!value)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'userId');

        this.data.userId = value;
    }

    /* Handlers */

    wasRead(): boolean {
        return (
            this.data.finishReadAt != null &&
            new Date(this.data.finishReadAt) <= new Date()
        );
    }
}
