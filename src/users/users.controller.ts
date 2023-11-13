import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { IControllerRoute } from '../common/route.interface';
import { LoggerService } from '../logger/logger.server';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';

@injectable()
export class UserController extends BaseController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoute(this.getUserRoutes());
  }

  login(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'User is signed in');
  }
  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'User is registered');
  }

  private getUserRoutes(): IControllerRoute[] {
    return [
      {
        path: '/login',
        func: this.login,
        method: 'post',
      },
      { path: '/register', func: this.register, method: 'post' },
    ];
  }
}
