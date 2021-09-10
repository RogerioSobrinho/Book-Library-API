import {
    Authorized,
    Body,
    Delete,
    Get,
    HeaderParam,
    HttpCode,
    JsonController,
    Param,
    Params,
    Post,
    Put,
    QueryParams,
    Req,
    UseBefore,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import { Request } from 'express';
import { RoleId } from '../../../core/domain/enums/role/RoleId';
import { CreateBookCommand } from '../../../core/usecases/book/commands/create-book/CreateBookCommand';
import { CreateBookCommandHandle } from '../../../core/usecases/book/commands/create-book/CreateBookCommandHandle';
import { CreateBookCommandResult } from '../../../core/usecases/book/commands/create-book/CreateBookCommandResult';
import { DeleteBookCommand } from '../../../core/usecases/book/commands/delete-book/DeleteBookCommand';
import { DeleteBookCommandHandle } from '../../../core/usecases/book/commands/delete-book/DeleteBookCommandHandle';
import { UpdateBookCommand } from '../../../core/usecases/book/commands/update-book/UpdateBookCommand';
import { UpdateBookCommandHandle } from '../../../core/usecases/book/commands/update-book/UpdateBookCommandHandle';
import { UpdateBookCommandResult } from '../../../core/usecases/book/commands/update-book/UpdateBookCommandResult';
import { FindBookByIdQuery } from '../../../core/usecases/book/queries/find-book-by-id/FindBookByIdQuery';
import { FindBookByIdQueryHandle } from '../../../core/usecases/book/queries/find-book-by-id/FindBookByIdQueryHandle';
import { FindBookByIdQueryResult } from '../../../core/usecases/book/queries/find-book-by-id/FindBookByIdQueryResult';
import { FindBookByNameOrAuthorQuery } from '../../../core/usecases/book/queries/find-book-by-name-or-author/FindBookByNameOrAuthorQuery';
import { FindBookByNameOrAuthorQueryHandle } from '../../../core/usecases/book/queries/find-book-by-name-or-author/FindBookByNameOrAuthorQueryHandle';
import { FindBookByNameOrAuthorQueryResult } from '../../../core/usecases/book/queries/find-book-by-name-or-author/FindBookByNameOrAuthorQueryResult';
import { GetUserAuthByJwtQuery } from '../../../core/usecases/user/queries/get-user-auth-by-jwt/GetUserAuthByJwtQuery';
import { GetUserAuthByJwtQueryHandle } from '../../../core/usecases/user/queries/get-user-auth-by-jwt/GetUserAuthByJwtQueryHandler';
import { UploadPictureMiddleware } from '../../middlewares/UploadPictureMiddleware';

@Service()
@JsonController('/book')
export class BookController {
    constructor(
        private readonly _createBookCommandHandle: CreateBookCommandHandle,
        private readonly _updateBookCommandHandle: UpdateBookCommandHandle,
        private readonly _findBookByIdQueryHandle: FindBookByIdQueryHandle,
        private readonly _findBookByNameOrAuthorQueryHandle: FindBookByNameOrAuthorQueryHandle,
        private readonly _deleteBookCommandHandle: DeleteBookCommandHandle,
        private readonly _getUserAuthByJwtQueryHandle: GetUserAuthByJwtQueryHandle,
    ) {}

    @HttpCode(201)
    @Post('/')
    @Authorized(RoleId.CLIENT)
    @OpenAPI({
        description: 'Create Book.',
    })
    @ResponseSchema(CreateBookCommandResult)
    @UseBefore(UploadPictureMiddleware)
    async create(
        @HeaderParam('authorization') authorization: string,
        @Body() body: CreateBookCommand,
        @Req() req: Request,
    ): Promise<CreateBookCommandResult> {
        const param = new GetUserAuthByJwtQuery();
        param.token = authorization;
        body.picture = req.file?.filename || null;
        body.userId = (
            await this._getUserAuthByJwtQueryHandle.handle(param)
        ).userId;
        const result = await this._createBookCommandHandle.handle(body);
        return result;
    }

    @Put('/:id([0-9a-f-]{36})')
    @Authorized(RoleId.CLIENT)
    @OpenAPI({
        description: 'Update Book.',
    })
    @UseBefore(UploadPictureMiddleware)
    async update(
        @Param('id') id: string,
        @Body() body: UpdateBookCommand,
        @Req() req: Request,
    ): Promise<UpdateBookCommandResult> {
        body.id = id;
        body.picture = req.file?.filename || null;
        const result = await this._updateBookCommandHandle.handle(body);
        return result;
    }

    @Get('/:id([0-9a-f-]{36})')
    @Authorized(RoleId.CLIENT)
    @OpenAPI({
        description: 'Get Book by Id.',
    })
    async findById(
        @Params() param: FindBookByIdQuery,
    ): Promise<FindBookByIdQueryResult> {
        const result = await this._findBookByIdQueryHandle.handle(param);
        return result;
    }

    @Get('/filter')
    @Authorized(RoleId.CLIENT)
    @OpenAPI({
        description: 'Get Book by Author or Name.',
    })
    async findByNameOrAuthor(
        @QueryParams() param: FindBookByNameOrAuthorQuery,
    ): Promise<FindBookByNameOrAuthorQueryResult[]> {
        const result = await this._findBookByNameOrAuthorQueryHandle.handle(
            param,
        );
        return result;
    }

    @Delete('/:id([0-9a-f-]{36})')
    @Authorized(RoleId.CLIENT)
    @OpenAPI({
        description: 'Delete book.',
    })
    async delete(@Params() param: DeleteBookCommand): Promise<boolean> {
        const didDelete = await this._deleteBookCommandHandle.handle(param);
        return didDelete;
    }
}
