import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('notelab');

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:4000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.use(cookieParser())

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap();


