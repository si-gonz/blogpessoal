import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00'
// Habilitando globalmente a validação de dados 
  app.useGlobalPipes(new ValidationPipe());

// Habilitar o Cors na aplicação global
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
