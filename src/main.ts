import { App } from './app';
import { BaseController } from './common/base.controller';
import { LoggerService } from './logger/logger.server';
import { UserController } from './users/users.controller';

async function bootstrap() {
  const app = new App(
    new LoggerService(),
    new UserController(new LoggerService())
  );
  await app.init();
}
bootstrap();
