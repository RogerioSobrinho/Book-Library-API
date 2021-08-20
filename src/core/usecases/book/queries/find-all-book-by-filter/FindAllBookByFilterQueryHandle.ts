import { Inject, Service } from 'typedi';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';
import { ICommandHandler } from '../../../../domain/common/usecases/interfaces/ICommandHandler';
import { Book } from '../../../../domain/entities/Book';
import { IBookRepository } from '../../../../repositories/book/IBookRepository';
import { FindAllBookByFilterQuery } from './FindAllBookByFilterQuery';

@Service()
export class FindAllBookByFilterQueryHandler
    implements ICommandHandler<FindAllBookByFilterQuery, Book[]>
{
    @Inject('book.repository')
    private readonly _bookRepository: IBookRepository;

    async handle(param: FindAllBookByFilterQuery): Promise<Book[]> {
        const data = new Book();
        data.author = param.author;
        data.description = param.description;
        data.id = param.id;
        data.language = param.language;
        data.name = param.name;
        data.publishAt = param.publishAt;
        const books = await this._bookRepository.getByFilter(data);
        if (!books) throw new SystemError(MessageError.DATA_NOT_FOUND, 'Book');
        return books;
    }
}
