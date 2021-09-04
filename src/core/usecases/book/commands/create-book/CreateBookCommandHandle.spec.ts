/* eslint-disable @typescript-eslint/no-empty-function */
import Container from 'typedi';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';
import { Book } from '../../../../domain/entities/Book';
import { IBookRepository } from '../../../../repositories/book/IBookRepository';
import { CreateBookCommand } from './CreateBookCommand';
import { CreateBookCommandHandle } from './CreateBookCommandHandle';

Container.set('book.repository', {
    async createGet() {},
});

const bookRepository = Container.get<IBookRepository>('book.repository');

const createBookCommandHandle = Container.get(CreateBookCommandHandle);

describe('Book - Create a Book', () => {
    test('should create a book', async () => {
        const book: CreateBookCommand = {
            author: 'ANY',
            userId: 'ANY',
            name: 'ANY',
        } as CreateBookCommand;
        jest.spyOn(bookRepository, 'createGet').mockReturnValue(
            Promise.resolve(book as Book),
        );
        const result = await createBookCommandHandle.handle(book);
        expect(result).toEqual(book);
    });

    test('should return an exception if try create a null object', async () => {
        const result = await createBookCommandHandle
            .handle(null)
            .catch(error => error);
        expect(result).toEqual(
            new SystemError(MessageError.PARAM_IS_REQUIRED, 'name and author'),
        );
    });

    test("should return an exception if don't return the saved object", async () => {
        jest.spyOn(bookRepository, 'createGet').mockReturnValue(null);
        const book: CreateBookCommand = {
            author: 'ANY',
            userId: 'ANY',
            name: 'ANY',
        } as CreateBookCommand;
        const result = await createBookCommandHandle
            .handle(book)
            .catch(error => error);
        expect(result).toEqual(
            new SystemError(MessageError.DATA_CANNOT_SAVE, 'Book'),
        );
    });
});
