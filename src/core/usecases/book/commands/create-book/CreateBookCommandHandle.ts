import { Inject, Service } from 'typedi';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';
import { ICommandHandler } from '../../../../domain/common/usecases/interfaces/ICommandHandler';
import { Book } from '../../../../domain/entities/Book';
import { IBookRepository } from '../../../../repositories/book/IBookRepository';
import { CreateBookCommand } from './CreateBookCommand';

@Service()
export class CreateBookCommandHandler
  implements ICommandHandler<CreateBookCommand, Book>
{
  @Inject('book.repository')
  private readonly _bookRepository: IBookRepository;

  async handle(param: CreateBookCommand): Promise<Book> {
    const data = new Book();
    data.author = param.author;
    data.description = param.description;
    data.language = param.language;
    data.name = param.name;
    data.publishAt = param.publishAt;
    data.startReadAt = param.startReadAt;
    data.finishReadAt = param.finishReadAt;
    const book = await this._bookRepository.createGet(data);

    if (!book) throw new SystemError(MessageError.DATA_CANNOT_SAVE, 'Book');
    return book;
  }
}
