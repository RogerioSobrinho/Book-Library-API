import { IUser } from '../types/IUser';
import { BaseEntity } from './BaseEntity';

export class User extends BaseEntity<IUser> implements IUser {
    constructor(data?: IUser) {
        super(data);
    }

    private _email: string;

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }

    private _password: string;

    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        this._password = value;
    }
}
