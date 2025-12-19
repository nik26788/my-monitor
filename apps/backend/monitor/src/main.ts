import 'dotenv/config'
import './config/postgres/postgres.env'

import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix('api')

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
    await app.listen(process.env.PORT ?? 3001)
}
bootstrap()
