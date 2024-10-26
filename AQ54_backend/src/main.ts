import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Set up Swagger
  const config = new DocumentBuilder()
  .setTitle('AQ54 API')
  .setDescription('API documentation for aggregate sensor data')
  .setVersion('1.0')
  .addTag('sensors') 
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,  
    whitelist: true,  
  }));
  // Configuration CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Autorise les requêtes venant de localhost:3000
    methods: 'GET,POST,PUT,DELETE', // Méthodes HTTP autorisées
    allowedHeaders: 'Content-Type, Authorization', // En-têtes autorisés
    credentials: true, // Si vous souhaitez autoriser les cookies
  });

  await app.listen(process.env.PORT ?? 5000);
}

bootstrap();
