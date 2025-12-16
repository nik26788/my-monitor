import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ClickhouseModule } from './fundamentals/clickhouse/clickhouse.module'
import { SpanModule } from './modules/span/span.module'

@Module({
    imports: [
        ClickhouseModule.forRoot({
            url: 'http://43.132.130.236:8123',
            username: 'nick',
            password: 'nickclickhouse',
        }),
        SpanModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
