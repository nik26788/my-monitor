import 'dotenv/config'
import './config/clickhouse/clickhouse.env'
import './config/email/email.env'

import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.enableCors({
        origin: (origin, callback) => {
            if (!origin || origin.includes('192.168.208.1') || origin.includes('nikdev.cn')) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
    })

    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
