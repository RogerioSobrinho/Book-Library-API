/* eslint-disable @typescript-eslint/no-empty-function */
import Container from 'typedi';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';
import { IBookRepository } from '../../../../repositories/book/IBookRepository';
import { DeleteBookCommand } from './DeleteBookCommand';
import { DeleteBookCommandHandle } from './DeleteBookCommandHandle';

Container.set('book.repository', {
    async delete() {},
});
const bookRepository = Container.get<IBookRepository>('book.repository');
const deleteBookCommandHandle = Container.get(DeleteBookCommandHandle);

describe('Book - Delete a Book', () => {
    test('should delete a book by id', async () => {
        jest.spyOn(bookRepository, 'delete').mockReturnValue(
            Promise.resolve(true),
        );
        const param: DeleteBookCommand = {
            id: 'ANY',
        };
        const didDelete = await deleteBookCommandHandle.handle(param);
        expect(didDelete).toEqual(true);
    });

    test('should return exception if try delete a book without id', async () => {
        const didDelete = await deleteBookCommandHandle
            .handle(null)
            .catch(error => error);
        expect(didDelete).toEqual(
            new SystemError(MessageError.PARAM_IS_REQUIRED, 'id'),
        );
    });

    test('should return exception if delete fail', async () => {
        jest.spyOn(bookRepository, 'delete').mockReturnValue(
            Promise.resolve(false),
        );
        const param: DeleteBookCommand = {
            id: 'ANY',
        };
        const didDelete = await deleteBookCommandHandle
            .handle(param)
            .catch(error => error);
        expect(didDelete).toEqual(
            new SystemError(MessageError.DATA_CANNOT_DELETE, 'Book'),
        );
    });
});
