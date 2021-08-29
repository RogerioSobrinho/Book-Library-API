/* eslint-disable @typescript-eslint/no-empty-function */
import Container from 'typedi';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';
import { Book } from '../../../../domain/entities/Book';
import { IBookRepository } from '../../../../repositories/book/IBookRepository';
import { UpdateBookCommand } from './UpdateBookCommand';
import { UpdateBookCommandHandle } from './UpdateBookCommandHandle';

Container.set('book.repository', {
    async updateGet() {},
});

const bookRepository = Container.get<IBookRepository>('book.repository');
const updateBookCommandHandle = Container.get(UpdateBookCommandHandle);
describe('Book - Update a book', () => {
    test('should update a book', async () => {
        const param: UpdateBookCommand = {
            id: 'ANY',
            name: 'ANY',
            author: 'ANY',
        } as UpdateBookCommand;
        jest.spyOn(bookRepository, 'updateGet').mockReturnValue(
            Promise.resolve(param as Book),
        );
        const result = await updateBookCommandHandle.handle(param);
        expect(result).toEqual(param as Book);
    });

    test('should return exception if param without id', async () => {
        const param: UpdateBookCommand = {
            name: 'ANY',
            author: 'ANY',
        } as UpdateBookCommand;
        const result = await updateBookCommandHandle
            .handle(param)
            .catch(error => error);
        expect(result).toEqual(
            new SystemError(
                MessageError.PARAM_IS_REQUIRED,
                'id, name and author',
            ),
        );
    });

    test('should return exception if update fail', async () => {
        const param: UpdateBookCommand = {
            id: 'ANY',
            name: 'ANY',
            author: 'ANY',
        } as UpdateBookCommand;
        jest.spyOn(bookRepository, 'updateGet').mockReturnValue(
            Promise.resolve(null),
        );
        const result = await updateBookCommandHandle
            .handle(param)
            .catch(error => error);
        expect(result).toEqual(
            new SystemError(MessageError.DATA_CANNOT_SAVE, 'Book'),
        );
    });
});
