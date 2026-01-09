import 'dotenv/config'
import './config/postgres/postgres-env.schema'

import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app/app.module'
import useGlobal from './app/use-global'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    useGlobal(app)
    app.enableCors({
        origin: [/^http:\/\/localhost(:\d+)?$/, /^http:\/\/monitor\.nikdev\.cn$/],
    })

    // Swagger configuration
    const config = new DocumentBuilder()
        .setTitle('Monitor API')
        .setDescription('Monitor API Documentation')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            },
            'JWT-auth'
        )
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api-docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    })

    app.setGlobalPrefix(process.env.APP_PREFIX || '/')
    await app.listen(process.env.APP_PORT ?? 3001)
}

bootstrap()
