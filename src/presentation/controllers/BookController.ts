import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Params,
    Post,
    Put,
    QueryParams,
    UseAfter,
} from 'routing-controllers';
import { Service } from 'typedi';
import { CreateBookCommand } from '../../core/usecases/book/commands/create-book/CreateBookCommand';
import { CreateBookCommandHandler } from '../../core/usecases/book/commands/create-book/CreateBookCommandHandle';
import { DeleteBookCommand } from '../../core/usecases/book/commands/delete-book/DeleteBookCommand';
import { DeleteBookCommandHandler } from '../../core/usecases/book/commands/delete-book/DeleteBookCommandHandle';
import { UpdateBookCommand } from '../../core/usecases/book/commands/update-book/UpdateBookCommand';
import { UpdateBookCommandHandler } from '../../core/usecases/book/commands/update-book/UpdateBookCommandHandle';
import { FindBookByIdQuery } from '../../core/usecases/book/queries/find-book-by-id/FindBookByIdQuery';
import { FindBookByIdQueryHandler } from '../../core/usecases/book/queries/find-book-by-id/FindBookByIdQueryHandle';
import { FindBookByNameOrAuthorQuery } from '../../core/usecases/book/queries/find-book-by-name-or-author/FindBookByNameOrAuthorQuery';
import { FindBookByNameOrAuthorQueryHandler } from '../../core/usecases/book/queries/find-book-by-name-or-author/FindBookByNameOrAuthorQueryHandle';
import { ErrorMiddleware } from '../middlewares/ErrorMiddleware';

@Service()
@Controller('/book')
@UseAfter(ErrorMiddleware)
export class BookController {
    constructor(
        private readonly _createBookCommandHandler: CreateBookCommandHandler,
        private readonly _updateBookCommandHandler: UpdateBookCommandHandler,
        private readonly _findBookByIdQueryHandler: FindBookByIdQueryHandler,
        private readonly _findBookByNameOrAuthorQueryHandler: FindBookByNameOrAuthorQueryHandler,
        private readonly _deleteBookCommandHandler: DeleteBookCommandHandler,
    ) {}

    @HttpCode(201)
    @Post('/')
    async create(@Body() body: CreateBookCommand) {
        const result = await this._createBookCommandHandler.handle(body);
        return result;
    }

    @Put('/:id([0-9a-f-]{36})')
    async update(@Param('id') id: string, @Body() body: UpdateBookCommand) {
        body.id = id;
        const result = await this._updateBookCommandHandler.handle(body);
        return result;
    }

    @Get('/:id([0-9a-f-]{36})')
    async findById(@Params() param: FindBookByIdQuery) {
        const result = await this._findBookByIdQueryHandler.handle(param);
        return result;
    }

    @Get('/filter')
    async findByNameOrAuthor(
        @QueryParams() param: FindBookByNameOrAuthorQuery,
    ) {
        const result = await this._findBookByNameOrAuthorQueryHandler.handle(
            param,
        );
        return result;
    }

    @Delete('/:id([0-9a-f-]{36})')
    async delete(@Params() param: DeleteBookCommand) {
        const didDelete = await this._deleteBookCommandHandler.handle(param);
        return didDelete;
    }
}
