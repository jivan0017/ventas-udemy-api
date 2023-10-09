import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CORS } from './config/constants/cors';

async function bootstrap() {
    // Definiendo la constante APP a nivel de toda la app
    const app = await NestFactory.create(AppModule);

    // INFO: preparando el mecanismo con cargue dinámico de variables de entorno
    const configService = app.get(ConfigService);

    // NOTE: añade validaciones automáticamente, teniendo en cuenta los decorators de los DTOs
    //  app.useGlobalPipes(new ValidationPipe());

    // NOTE: Habilitar CORS
    app.enableCors(CORS);

    // NOTE: Agrega el prefijo /api/
    // app.setGlobalPrefix('api');
    
    console.log("ConfigService: >>>> from main.ts", configService.get('APP_PORT'));

    await app.listen(configService.get('APP_PORT'));
}
bootstrap();
