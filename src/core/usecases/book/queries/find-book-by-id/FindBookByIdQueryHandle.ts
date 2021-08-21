import { Inject, Service } from 'typedi';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';
import { ICommandHandler } from '../../../../domain/common/usecases/interfaces/ICommandHandler';
import { Book } from '../../../../domain/entities/Book';
import { IBookRepository } from '../../../../repositories/book/IBookRepository';
import { FindBookByIdQuery } from './FindBookByIdQuery';

@Service()
export class FindBookByIdQueryHandler
    implements ICommandHandler<FindBookByIdQuery, Book>
{
    @Inject('book.repository')
    private readonly _bookRepository: IBookRepository;

    async handle(param: FindBookByIdQuery): Promise<Book> {
        const book = await this._bookRepository.getById(param.id);
        if (!book) throw new SystemError(MessageError.DATA_NOT_FOUND, 'Book');
        return book;
    }
}
