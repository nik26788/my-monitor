import { Module } from '@nestjs/common'

import { clickhouseConfig } from '../config/clickhouse/clickhouse.config'
import { emailConfig } from '../config/email/email.config'
import { ClickhouseModule } from '../fundamentals/clickhouse/clickhouse.module'
import { EmailModule } from '../fundamentals/email/email.module'
import { SpanModule } from '../modules/span/span.module'

@Module({
    imports: [
        ClickhouseModule.forRoot({ ...clickhouseConfig }), // database
        EmailModule.forRoot({ ...emailConfig }),
        SpanModule,
    ],
})
export class AppModule {}
