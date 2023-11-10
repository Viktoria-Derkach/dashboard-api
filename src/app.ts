import express, { Express } from 'express';
import { UserController } from './users/users.controller';
import { Server } from 'http';
import { LoggerService } from './logger/logger.server';

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;
  userRouter: UserController;

  constructor(logger: LoggerService, userRouter: UserController) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userRouter = userRouter;
  }

  useRoutes() {
    this.app.use('/users', this.userRouter.router);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server is on http://localhost:${this.port}`);
  }
}
