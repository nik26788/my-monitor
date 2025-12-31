import 'dotenv/config'
import './config/postgres/postgres-env.schema'

import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'
import useGlobal from './app/use-global'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    useGlobal(app)
    app.enableCors({
        origin: [/^http:\/\/localhost(:\d+)?$/, /^http:\/\/monitor\.nikdev\.cn$/],
    })

    // TODO swagger document

    app.setGlobalPrefix(process.env.APP_PREFIX || '/')
    await app.listen(process.env.APP_PORT ?? 3001)
}

bootstrap()
