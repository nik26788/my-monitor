import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ClickhouseModule } from './fundamentals/clickhouse/clickhouse.module'
import { EmailModule } from './fundamentals/email/email.module'
import { SpanModule } from './modules/span/span.module'

@Module({
    imports: [
        ClickhouseModule.forRoot({
            url: 'http://43.132.130.236:8123',
            username: 'nick',
            password: 'nickclickhouse',
        }),
        EmailModule.forRoot({
            host: 'smtp.163.com',
            port: 465,
            secure: true,
            auth: {
                user: 'risin_wangx@163.com',
                pass: 'PPyUUwT8T6c6fC6n',
            },
        }),
        SpanModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
