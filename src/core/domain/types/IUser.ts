import { IEntity } from './IEntity';

export interface IUser extends IEntity {
    id: string;
    email: string;
    password: string;
}
