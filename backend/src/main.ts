import { register } from 'tsconfig-paths';
import * as tsConfig from '../tsconfig.json';

register({
  baseUrl: tsConfig.compilerOptions.baseUrl || './',
  paths: (tsConfig.compilerOptions as any).paths || {},
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UniversalExceptionFilter } from './common/filters/universal-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new UniversalExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
