import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (error) => {
        const cleanErros = error.map((error) => {
          return { property: error.property, constraints: error.constraints };
        });
        return new BadRequestException({
          alert: 'error...',
          errors: cleanErros,
        });
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('TjoseColedani ')
    .setDescription(
      '¡Bienvenido a mi App, tu plataforma todo en uno! Descubre una experiencia única para gestionar tus datos de forma segura y eficiente. Desde registros de usuarios hasta manejo de productos y pedidos, MiApp te ofrece todo lo que necesitas para hacer crecer tu negocio.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
