import { NextFunction, Request, Response } from 'express';
import { IMiddleWare } from './middleware.interface';
import { injectable } from 'inversify';
import { HTTPError } from '../errors/http-error.class';

@injectable()
export class AuthValidateMiddleware implements IMiddleWare {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.user) {
			next();
		} else {
			return next(new HTTPError(401, 'Authorization error', 'Auth'));
		}
	}
}
