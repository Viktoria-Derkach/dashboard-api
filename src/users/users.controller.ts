import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response, Router, IRouter } from 'express';
import { IControllerRoute } from '../common/route.interface';
import { LoggerService } from '../logger/logger.server';

export class UserController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoute(this.getUserRoutes());
  }

  login(req: Request, res: Response) {
    this.ok(res, 'User is signed in');
  }
  register(req: Request, res: Response) {
    this.ok(res, 'User is registered');
  }

  getUserRoutes(): IControllerRoute[] {
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
