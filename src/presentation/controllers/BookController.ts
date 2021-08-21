import {
    Body,
    Delete,
    Get,
    HttpCode,
    JsonController,
    Param,
    Params,
    Post,
    Put,
    QueryParams,
    UseAfter,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import { CreateBookCommand } from '../../core/usecases/book/commands/create-book/CreateBookCommand';
import { CreateBookCommandHandler } from '../../core/usecases/book/commands/create-book/CreateBookCommandHandle';
import { CreateBookCommandResult } from '../../core/usecases/book/commands/create-book/CreateBookCommandResult';
import { DeleteBookCommand } from '../../core/usecases/book/commands/delete-book/DeleteBookCommand';
import { DeleteBookCommandHandler } from '../../core/usecases/book/commands/delete-book/DeleteBookCommandHandle';
import { UpdateBookCommand } from '../../core/usecases/book/commands/update-book/UpdateBookCommand';
import { UpdateBookCommandHandler } from '../../core/usecases/book/commands/update-book/UpdateBookCommandHandle';
import { UpdateBookCommandResult } from '../../core/usecases/book/commands/update-book/UpdateBookCommandResult';
import { FindBookByIdQuery } from '../../core/usecases/book/queries/find-book-by-id/FindBookByIdQuery';
import { FindBookByIdQueryHandler } from '../../core/usecases/book/queries/find-book-by-id/FindBookByIdQueryHandle';
import { FindBookByIdQueryResult } from '../../core/usecases/book/queries/find-book-by-id/FindBookByIdQueryResult';
import { FindBookByNameOrAuthorQuery } from '../../core/usecases/book/queries/find-book-by-name-or-author/FindBookByNameOrAuthorQuery';
import { FindBookByNameOrAuthorQueryHandler } from '../../core/usecases/book/queries/find-book-by-name-or-author/FindBookByNameOrAuthorQueryHandle';
import { FindBookByNameOrAuthorQueryResult } from '../../core/usecases/book/queries/find-book-by-name-or-author/FindBookByNameOrAuthorQueryResult';
import { ErrorMiddleware } from '../middlewares/ErrorMiddleware';

@Service()
@JsonController('/book')
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
    @OpenAPI({
        description: 'Create Book.',
        requestBody: {
            description: 'Book Object',
            content: {
                ['CreateBookCommand']: CreateBookCommand,
            },
            required: true,
        },
    })
    @ResponseSchema(CreateBookCommandResult)
    async create(
        @Body() body: CreateBookCommand,
    ): Promise<CreateBookCommandResult> {
        const result = await this._createBookCommandHandler.handle(body);
        return result;
    }

    @Put('/:id([0-9a-f-]{36})')
    @OpenAPI({
        description: 'Update Book.',
    })
    async update(
        @Param('id') id: string,
        @Body() body: UpdateBookCommand,
    ): Promise<UpdateBookCommandResult> {
        body.id = id;
        const result = await this._updateBookCommandHandler.handle(body);
        return result;
    }

    @Get('/:id([0-9a-f-]{36})')
    @OpenAPI({
        description: 'Get Book by Id.',
    })
    async findById(
        @Params() param: FindBookByIdQuery,
    ): Promise<FindBookByIdQueryResult> {
        const result = await this._findBookByIdQueryHandler.handle(param);
        return result;
    }

    @Get('/filter')
    @OpenAPI({
        description: 'Get Book by Author or Name.',
    })
    async findByNameOrAuthor(
        @QueryParams() param: FindBookByNameOrAuthorQuery,
    ): Promise<FindBookByNameOrAuthorQueryResult[]> {
        const result = await this._findBookByNameOrAuthorQueryHandler.handle(
            param,
        );
        return result;
    }

    @Delete('/:id([0-9a-f-]{36})')
    @OpenAPI({
        description: 'Delete book.',
    })
    async delete(@Params() param: DeleteBookCommand): Promise<boolean> {
        const didDelete = await this._deleteBookCommandHandler.handle(param);
        return didDelete;
    }
}
