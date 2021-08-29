import { Service } from 'typedi';
import { SortType } from '../../../../../core/domain/common/database/SortType';
import { Book } from '../../../../../core/domain/entities/Book';
import { IBookRepository } from '../../../../../core/repositories/book/IBookRepository';
import { BookDb } from '../../entities/book/BookDb';
import { BOOK_SCHEMA } from '../../schemas/book/BookSchema';
import { BaseRepository } from '../base/BaseRepository';

@Service('book.repository')
export class BookRepository
    extends BaseRepository<Book, BookDb, string>
    implements IBookRepository
{
    constructor() {
        super(BookDb, BOOK_SCHEMA);
    }

    async getByFilter(name?: string, author?: string): Promise<Book[]> {
        const list = await this.repository
            .createQueryBuilder(BOOK_SCHEMA.TABLE_NAME)
            .where(
                name
                    ? `${BOOK_SCHEMA.TABLE_NAME}.${BOOK_SCHEMA.COLUMNS.NAME} like :name`
                    : '1=1',
                {
                    name: `%${name}%`,
                },
            )
            .andWhere(
                author
                    ? `${BOOK_SCHEMA.TABLE_NAME}.${BOOK_SCHEMA.COLUMNS.AUTHOR} like :author`
                    : '1=1',
                {
                    author: `%${author}%`,
                },
            )
            .orderBy(
                `${BOOK_SCHEMA.TABLE_NAME}.${BOOK_SCHEMA.COLUMNS.NAME}`,
                SortType.ASC,
            )
            .getMany();
        return list.map(item => item.toEntity());
    }
}
