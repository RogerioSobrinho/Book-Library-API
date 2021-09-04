import { IUser } from '../types/IUser';
import { BaseEntity } from './BaseEntity';

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
}
