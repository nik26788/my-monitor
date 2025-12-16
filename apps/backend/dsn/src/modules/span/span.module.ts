import { Module } from '@nestjs/common'

import { ClickhouseModule } from '../../fundamentals/clickhouse/clickhouse.module'
import { SpanController } from './span.controller'
import { SpanService } from './span.service'

@Module({
    imports: [
        ClickhouseModule.forRoot({
            url: 'http://43.132.130.236:8123',
            username: 'nick',
            password: 'nickclickhouse',
        }),
    ],
    controllers: [SpanController],
    providers: [SpanService],
})
export class SpanModule {}
