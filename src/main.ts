import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const nodeEnv = configService.get('app.nodeEnv');
  const port = configService.get('app.port');
  const webSocketPort = configService.get('app.webSocketPort');

  await app.listen(port);

  const logger = new Logger('APPLICATION STARTED HERE');
  logger.log(`SWAGGER DOC: http://localhost:${port}/docs`);
  logger.log(`API ROUTER ${nodeEnv} MODE: http://localhost:${port}`);
  logger.log(`WEBSOCKET: ws://localhost:${webSocketPort}`);
}
bootstrap();
