import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { clickhouseConfig } from './config/clickhouse/clickhouse.config'
import { emailConfig } from './config/email/email.config'
import { ClickhouseModule } from './fundamentals/clickhouse/clickhouse.module'
import { EmailModule } from './fundamentals/email/email.module'
import { SpanModule } from './modules/span/span.module'

@Module({
    imports: [
        ClickhouseModule.forRoot({
            url: clickhouseConfig.url,
            username: clickhouseConfig.username,
            password: clickhouseConfig.password,
        }),
        EmailModule.forRoot({
            host: 'smtp.163.com',
            port: 465,
            secure: true,
            auth: {
                user: emailConfig.username,
                pass: emailConfig.password,
            },
        }),
        SpanModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
