import { Request, Response } from 'express';
import multer from 'multer';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { IS_DEVELOPMENT } from '../../config/Configuration';
import { InternalServerError } from '../../core/domain/common/exceptions/InternalServerError';

export class UploadPictureMiddleware implements ExpressMiddlewareInterface {
    use(req: Request, res: Response, next?: any): any {
        const upload = multer({
            dest: './books-picture/',
        }).single('picture');
        upload(req, res, err => {
            if (err) {
                if (IS_DEVELOPMENT) console.error(err);
                res.status(500).send(new InternalServerError());
            }
            next();
        });
    }
}
