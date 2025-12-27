import 'dotenv/config'
import './config/clickhouse/clickhouse.env'
import './config/email/email.env'

import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter'
import { TransformInterceptor } from './common/interceptors/transform/transform.interceptor'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalFilters(new HttpExceptionFilter())
    app.useGlobalInterceptors(new TransformInterceptor())
    app.setGlobalPrefix(process.env.APP_PREFIX ?? '')
    app.enableCors()

    await app.listen(process.env.APP_PORT ?? 3000)
}
bootstrap()
