import { Inject, Service } from 'typedi';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';
import { ICommandHandler } from '../../../../domain/common/usecases/interfaces/ICommandHandler';
import { Book } from '../../../../domain/entities/Book';
import { IBookRepository } from '../../../../repositories/book/IBookRepository';
import { UpdateBookCommand } from './UpdateBookCommand';
import { UpdateBookCommandResult } from './UpdateBookCommandResult';

@Service()
export class UpdateBookCommandHandle
    implements ICommandHandler<UpdateBookCommand, UpdateBookCommandResult>
{
    @Inject('book.repository')
    private readonly _bookRepository: IBookRepository;

    async handle(param: UpdateBookCommand): Promise<UpdateBookCommandResult> {
        const paramIsValid = param && param.name && param.author && param.id;
        if (!paramIsValid) {
            throw new SystemError(
                MessageError.PARAM_IS_REQUIRED,
                'id, name and author',
            );
        }

        const data = new Book();
        data.author = param.author;
        data.description = param.description;
        data.picture = param.picture;
        data.language = param.language;
        data.name = param.name;
        data.publishAt = param.publishAt;
        data.startReadAt = param.startReadAt;
        data.finishReadAt = param.finishReadAt;
        const book = await this._bookRepository.updateGet(param.id, data);

        if (!book) throw new SystemError(MessageError.DATA_CANNOT_SAVE, 'Book');
        return book;
    }
}
