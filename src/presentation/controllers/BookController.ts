import {
    Body,
    Controller,
    Get,
    NotFoundError,
    Params,
    Post,
    UseAfter,
} from 'routing-controllers';
import { Service } from 'typedi';
import { CreateBookCommand } from '../../core/usecases/book/commands/create-book/CreateBookCommand';
import { CreateBookCommandHandler } from '../../core/usecases/book/commands/create-book/CreateBookCommandHandle';
import { FindAllBookByFilterQuery } from '../../core/usecases/book/queries/find-all-book-by-filter/FindAllBookByFilterQuery';
import { FindAllBookByFilterQueryHandler } from '../../core/usecases/book/queries/find-all-book-by-filter/FindAllBookByFilterQueryHandle';
import { ErrorMiddleware } from '../middlewares/ErrorMiddleware';

@Service()
@Controller('/book')
@UseAfter(ErrorMiddleware)
export class BookController {
    constructor(
        private readonly _createBookCommandHandler: CreateBookCommandHandler,
        private readonly _findallbookbyfilterQueryHandler: FindAllBookByFilterQueryHandler,
    ) {}

    @Post('/')
    async create(@Body() body: CreateBookCommand) {
        console.log('Controller', body);
        const result = await this._createBookCommandHandler.handle(body);
        return result;
    }

    @Get('/:id([0-9a-f-]{36})')
    async findById(@Params() param: FindAllBookByFilterQuery) {
        const result = await this._findallbookbyfilterQueryHandler.handle(
            param,
        );
        if (!result) throw new NotFoundError();
        return result;
    }
}
