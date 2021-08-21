import { Inject, Service } from 'typedi';
import { NoContentError } from '../../../../domain/common/exceptions/NoContentError';
import { ICommandHandler } from '../../../../domain/common/usecases/interfaces/ICommandHandler';
import { Book } from '../../../../domain/entities/Book';
import { IBookRepository } from '../../../../repositories/book/IBookRepository';
import { FindBookByNameOrAuthorQuery } from './FindBookByNameOrAuthorQuery';

@Service()
export class FindBookByNameOrAuthorQueryHandler
    implements ICommandHandler<FindBookByNameOrAuthorQuery, Book[]>
{
    @Inject('book.repository')
    private readonly _bookRepository: IBookRepository;

    async handle(param: FindBookByNameOrAuthorQuery): Promise<Book[]> {
        const books = await this._bookRepository.getByFilter(
            param.name,
            param.author,
        );
        if (!books.length) throw new NoContentError();
        return books;
    }
}
