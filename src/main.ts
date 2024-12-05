import helmet from 'helmet';
import { doubleCsrf } from 'csrf-csrf';
import { DoubleCsrfConfigOptions } from 'csurf';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  const doubleCsrfOptions: DoubleCsrfConfigOptions = {
    cookie: {
      key: 'csrf-token',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    },
    getSecret: () => {
      return process.env.CSRF_SECRET || 'your_default_secret';
    },
  };
  const { doubleCsrfProtection } = doubleCsrf(doubleCsrfOptions);
  app.use(doubleCsrfProtection);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  console.log('Running port', process.env.PORT);

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
