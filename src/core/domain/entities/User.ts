import { MessageError } from '../common/exceptions/message/MessageError';
import { SystemError } from '../common/exceptions/SystemError';
import { RoleId } from '../enums/role/RoleId';
import { IUser } from '../types/IUser';
import { BaseEntity } from './BaseEntity';
import { Book } from './Book';

export class User extends BaseEntity<IUser> implements IUser {
    constructor(data?: IUser) {
        super(data);
    }

    public get id(): string {
        return this.data.id;
    }

    public set id(value: string) {
        this.data.id = value;
    }

    get role(): RoleId {
        return this.data.role;
    }

    set role(value: RoleId) {
        if (!value) throw new SystemError(MessageError.PARAM_REQUIRED, 'role');

        this.data.role = value;
    }

    public get email(): string {
        return this.data.email;
    }

    public set email(value: string) {
        this.data.email = value;
    }

    public get password(): string {
        return this.data.password;
    }

    public set password(value: string) {
        this.data.password = value;
    }

    /* Relationship */

    get books(): Book[] | null {
        return this.data.books
            ? this.data.books.map(book => new Book(book))
            : null;
    }
}
