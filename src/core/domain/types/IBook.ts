import { IEntity } from './IEntity';

export interface IBook extends IEntity {
    id: number;
    name: string;
    description: string | null;
    author: string | null;
    publishAt: Date | null;
    language: string;
    startReadAt: Date | null;
    finishReadAt: Date | null;
}
