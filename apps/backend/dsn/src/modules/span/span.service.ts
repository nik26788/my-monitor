import { ClickHouseClient } from '@clickhouse/client'
import { Inject, Injectable } from '@nestjs/common'

import { EmailService } from '../email/email.service'

@Injectable()
export class SpanService {
    constructor(
        @Inject('CLICKHOUSE_CLIENT') private readonly clickhouseClient: ClickHouseClient,
        private emailService: EmailService
    ) {}

    async tracking(app_id: string, params: { event_type: string; message?: string }) {
        const { event_type, message, ...rest } = params

        const values = {
            app_id,
            event_type,
            message,
            info: rest,
        }

        if (event_type === 'error') {
            this.emailService.alert({
                to: 'risin_wangxu@qq.com',
                subject: 'Warning from my-monitor',
                params: {
                    ...params,
                    ...values,
                },
            })
        }

        await this.clickhouseClient.insert({
            table: 'nick.base_monitor_storage',
            values,
            columns: ['app_id', 'event_type', 'message', 'info'],
            format: 'JSONEachRow',
        })
    }
}
