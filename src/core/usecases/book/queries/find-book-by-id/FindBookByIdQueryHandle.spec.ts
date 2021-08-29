/* eslint-disable @typescript-eslint/no-empty-function */
import Container from 'typedi';
import { MessageError } from '../../../../domain/common/exceptions/message/MessageError';
import { SystemError } from '../../../../domain/common/exceptions/SystemError';
import { Book } from '../../../../domain/entities/Book';
import { IBookRepository } from '../../../../repositories/book/IBookRepository';
import { FindBookByIdQuery } from './FindBookByIdQuery';
import { FindBookByIdQueryHandle } from './FindBookByIdQueryHandle';

Container.set('book.repository', {
    async getById() {},
});

const bookRepository = Container.get<IBookRepository>('book.repository');
const findBookByIdQueryHandle = Container.get(FindBookByIdQueryHandle);

describe('Book: Find Book By Id', () => {
    test('get book by id without id', async () => {
        const param = {} as FindBookByIdQuery;
        const result = await findBookByIdQueryHandle
            .handle(param)
            .catch(error => error);
        expect(result).toEqual(
            new SystemError(MessageError.PARAM_IS_REQUIRED, 'id'),
        );
    });
    test('get book by id with data not found', async () => {
        jest.spyOn(bookRepository, 'getById').mockReturnValue(
            Promise.resolve(null),
        );
        const param: FindBookByIdQuery = {
            id: 'ANY',
        };
        const result = await findBookByIdQueryHandle
            .handle(param)
            .catch(error => error);
        expect(result).toEqual(
            new SystemError(MessageError.DATA_NOT_FOUND, 'book'),
        );
    });

    test('should return a book by id successfully', async () => {
        const book = {
            id: 'ANY',
            author: 'ANY',
            name: 'ANY',
        } as Book;
        jest.spyOn(bookRepository, 'getById').mockReturnValue(
            Promise.resolve(book),
        );
        const param: FindBookByIdQuery = {
            id: 'ANY',
        };
        const result = await findBookByIdQueryHandle.handle(param);
        expect(result).toEqual(book);
    });
});
