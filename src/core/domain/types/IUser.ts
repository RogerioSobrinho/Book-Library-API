import { RoleId } from '../enums/role/RoleId';
import { IBook } from './IBook';
import { IEntity } from './IEntity';

export interface IUser extends IEntity {
    id: string;
    role: RoleId;
    email: string;
    password: string;

    /* Relationship */

    books: IBook[] | null;
}
