import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  // app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  const nodeEnv = configService.get('app.nodeEnv');
  const port = configService.get('app.port');

  await app.listen(port, () => {
    console.log(`Server is in ${nodeEnv} mode running at ${port}`);
  });
}
bootstrap();
