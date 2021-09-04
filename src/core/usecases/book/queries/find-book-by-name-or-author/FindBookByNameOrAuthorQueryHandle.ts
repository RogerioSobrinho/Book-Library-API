import { Inject, Service } from 'typedi';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { NoContentError } from '../../../../domain/common/exceptions/NoContentError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';
import { IQueryHandler } from '../../../../domain/common/usecases/interfaces/IQueryHandler';
import { IBookRepository } from '../../../../repositories/book/IBookRepository';
import { FindBookByNameOrAuthorQuery } from './FindBookByNameOrAuthorQuery';
import { FindBookByNameOrAuthorQueryResult } from './FindBookByNameOrAuthorQueryResult';

@Service()
export class FindBookByNameOrAuthorQueryHandle
    implements
        IQueryHandler<
            FindBookByNameOrAuthorQuery,
            FindBookByNameOrAuthorQueryResult[]
        >
{
    @Inject('book.repository')
    private readonly _bookRepository: IBookRepository;

    async handle(
        param: FindBookByNameOrAuthorQuery,
    ): Promise<FindBookByNameOrAuthorQueryResult[]> {
        if (param == null || (!param.author && !param.name)) {
            throw new SystemError(
                MessageError.PARAM_IS_REQUIRED,
                'name and author',
            );
        }
        const books = await this._bookRepository.getByFilter(
            param.name,
            param.author,
        );
        if (!books.length) throw new NoContentError();
        return books;
    }
}
