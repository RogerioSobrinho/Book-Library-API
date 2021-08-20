import { IBook } from '../types/IBook';
import { BaseEntity } from './BaseEntity';

export class Book extends BaseEntity<IBook> implements IBook {
    constructor(data?: IBook) {
        super(data);
    }

    public get id(): number {
        return this.data.id;
    }

    public set id(value: number) {
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

    /* Handlers */

    wasRead(): boolean {
        return (
            this.data.finishReadAt != null &&
            new Date(this.data.finishReadAt) <= new Date()
        );
    }
}
