import { IEntity } from './IEntity';

export interface IBook extends IEntity {
    id: string;
    userId: string;
    name: string;
    picture: string;
    description: string | null;
    author: string | null;
    publishAt: Date | null;
    language: string;
    startReadAt: Date | null;
    finishReadAt: Date | null;
}
