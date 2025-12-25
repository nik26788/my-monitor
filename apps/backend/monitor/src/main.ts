import 'dotenv/config'
import './config/postgres/postgres.env'

import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter'
import { LogGuard } from './common/guards/log/log.guard'
import { LogInterceptor } from './common/interceptors/log/log.interceptor'
import { TransformInterceptor } from './common/interceptors/transform/transform.interceptor'
// import { BadRequestException, ValidationPipe } from '@nestjs/common'
import { LoggerService } from './common/logger/logger.service'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const loggerService = app.get(LoggerService)

    app.setGlobalPrefix(process.env.APP_PREFIX || '/')
    app.useGlobalInterceptors(new LogInterceptor())
    app.useGlobalInterceptors(new TransformInterceptor(loggerService))
    app.useGlobalFilters(new HttpExceptionFilter(loggerService))
    app.useGlobalGuards(new LogGuard())

    // app.useGlobalPipes(
    //     new ValidationPipe({
    //         whitelist: true,
    //         forbidNonWhitelisted: true,
    //         transform: true,
    //         exceptionFactory(errors) {
    //             return new BadRequestException({
    //                 code: 40001,
    //                 message: 'Parameter validation failed',
    //                 errors,
    //             })
    //         },
    //     })
    // )

    // app.enableCors({
    //     origin: (origin, callback) => {
    //         if (!origin || origin.includes('192.168.208.1') || origin.includes('nikdev')) {
    //             callback(null, true)
    //         } else {
    //             callback(new Error('Not allowed by CORS'))
    //         }
    //     },
    // })

    app.enableCors()
    await app.listen(process.env.APP_PORT ?? 3001)
}
bootstrap()
