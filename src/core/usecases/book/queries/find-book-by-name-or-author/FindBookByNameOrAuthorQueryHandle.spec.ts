/* eslint-disable @typescript-eslint/no-empty-function */
import Container from 'typedi';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';
import { Book } from '../../../../domain/entities/Book';
import { IBookRepository } from '../../../../repositories/book/IBookRepository';
import { FindBookByNameOrAuthorQuery } from './FindBookByNameOrAuthorQuery';
import { FindBookByNameOrAuthorQueryHandle } from './FindBookByNameOrAuthorQueryHandle';

Container.set('book.repository', {
    async getByFilter() {},
});

const bookRepository = Container.get<IBookRepository>('book.repository');
const findBookByNameOrAuthorQueryHandle = Container.get(
    FindBookByNameOrAuthorQueryHandle,
);
describe('Book - Find Book By Name or Author', () => {
    test('Get book by name or author without name or author', async () => {
        const result = await findBookByNameOrAuthorQueryHandle
            .handle(null)
            .catch(error => error);
        expect(result).toEqual(
            new SystemError(MessageError.PARAM_IS_REQUIRED, 'name and author'),
        );
    });

    test('Get book by name or author without  author', async () => {
        const books = [
            {
                author: 'ANY',
                name: 'ANY',
            },
        ] as Book[];
        jest.spyOn(bookRepository, 'getByFilter').mockResolvedValue(books);
        const result = await findBookByNameOrAuthorQueryHandle.handle({
            name: 'ANY',
        } as FindBookByNameOrAuthorQuery);
        expect(result).toEqual(books);
    });

    test('Get book by name or author without name', async () => {
        const books = [
            {
                author: 'ANY',
                name: 'ANY',
            },
        ] as Book[];
        jest.spyOn(bookRepository, 'getByFilter').mockResolvedValue(books);
        const result = await findBookByNameOrAuthorQueryHandle.handle({
            author: 'ANY',
        } as FindBookByNameOrAuthorQuery);
        expect(result).toEqual(books);
    });

    test('Get book by name and author successfully', async () => {
        const books = [
            {
                author: 'ANY',
                name: 'ANY',
            },
        ] as Book[];
        jest.spyOn(bookRepository, 'getByFilter').mockResolvedValue(books);
        const result = await findBookByNameOrAuthorQueryHandle.handle({
            author: 'ANY',
            name: 'ANY',
        } as FindBookByNameOrAuthorQuery);
        expect(result).toEqual(books);
    });
});
