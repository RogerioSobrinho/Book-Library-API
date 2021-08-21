import { Inject, Service } from 'typedi';
import { NoContentError } from '../../../../domain/common/exceptions/NoContentError';
import { ICommandHandler } from '../../../../domain/common/usecases/interfaces/ICommandHandler';
import { IBookRepository } from '../../../../repositories/book/IBookRepository';
import { FindBookByNameOrAuthorQuery } from './FindBookByNameOrAuthorQuery';
import { FindBookByNameOrAuthorQueryResult } from './FindBookByNameOrAuthorQueryResult';

@Service()
export class FindBookByNameOrAuthorQueryHandler
    implements
        ICommandHandler<
            FindBookByNameOrAuthorQuery,
            FindBookByNameOrAuthorQueryResult[]
        >
{
    @Inject('book.repository')
    private readonly _bookRepository: IBookRepository;

    async handle(
        param: FindBookByNameOrAuthorQuery,
    ): Promise<FindBookByNameOrAuthorQueryResult[]> {
        const books = await this._bookRepository.getByFilter(
            param.name,
            param.author,
        );
        if (!books.length) throw new NoContentError();
        return books;
    }
}
