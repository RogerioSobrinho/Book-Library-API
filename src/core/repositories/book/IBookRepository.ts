import { IBaseRepository } from '../../domain/common/database/interfaces/IBaseRepository';
import { Book } from '../../domain/entities/Book';

export interface IBookRepository extends IBaseRepository<Book, string> {
    getByFilter(name?: string, author?: string): Promise<Book[]>;
}
