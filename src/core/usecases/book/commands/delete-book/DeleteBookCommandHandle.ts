import { Inject, Service } from 'typedi';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';
import { ICommandHandler } from '../../../../domain/common/usecases/interfaces/ICommandHandler';
import { IBookRepository } from '../../../../repositories/book/IBookRepository';
import { DeleteBookCommand } from './DeleteBookCommand';

@Service()
export class DeleteBookCommandHandle
    implements ICommandHandler<DeleteBookCommand, boolean>
{
    @Inject('book.repository')
    private readonly _bookRepository: IBookRepository;

    async handle(param: DeleteBookCommand): Promise<boolean> {
        if (!param || !param.id)
            throw new SystemError(MessageError.PARAM_IS_REQUIRED, 'id');

        const didDelete = await this._bookRepository.delete(param.id);

        if (!didDelete)
            throw new SystemError(MessageError.DATA_CANNOT_DELETE, 'Book');
        return didDelete;
    }
}
