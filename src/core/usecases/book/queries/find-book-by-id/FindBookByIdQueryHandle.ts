import { Inject, Service } from 'typedi';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';
import { IQueryHandler } from '../../../../domain/common/usecases/interfaces/IQueryHandler';
import { IBookRepository } from '../../../../repositories/book/IBookRepository';
import { FindBookByIdQuery } from './FindBookByIdQuery';
import { FindBookByIdQueryResult } from './FindBookByIdQueryResult';

@Service()
export class FindBookByIdQueryHandle
    implements IQueryHandler<FindBookByIdQuery, FindBookByIdQueryResult>
{
    @Inject('book.repository')
    private readonly _bookRepository: IBookRepository;

    async handle(param: FindBookByIdQuery): Promise<FindBookByIdQueryResult> {
        if (!param.id)
            throw new SystemError(MessageError.PARAM_IS_REQUIRED, 'id');
        const book = await this._bookRepository.getById(param.id);
        if (!book) throw new SystemError(MessageError.DATA_NOT_FOUND, 'Book');
        return book;
    }
}
