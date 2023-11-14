import { LoggerService } from '../logger/logger.server';
import { Router, Response } from 'express';
import { ExpressReturnType, IControllerRoute } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	protected bindRoute(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const handler = route.func.bind(this); // bind the context to function
			this._router[route.method](route.path, handler);
		}
	}
}
