import { ClickHouseClient } from '@clickhouse/client'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { EmailService } from '../email/email.service'

@Injectable()
export class SpanService {
    constructor(
        @Inject('CLICKHOUSE_CLIENT') private readonly clickhouseClient: ClickHouseClient,
        private emailService: EmailService
    ) {}

    async list() {
        const result = await this.clickhouseClient.query({
            query: 'select * from nick.base_monitor_storage',
            format: 'JSONEachRow',
        })

        return result.json()
    }

    async tracking(app_id: string, params: { event_type: string; message?: string }) {
        const { event_type, message, ...rest } = params

        const values = {
            app_id,
            event_type,
            message,
            info: JSON.stringify(rest),
        }
        Logger.log(values)

        try {
            const result = await this.clickhouseClient.insert({
                table: 'nick.base_monitor_storage',
                values: [values],
                columns: ['app_id', 'event_type', 'message', 'info'],
                format: 'JSONEachRow',
            })
            Logger.log(result.query_id)
        } catch (error) {
            Logger.log(error)
        }

        if (event_type === 'error') {
            await this.emailService.alert({
                to: 'risin_wangxu@qq.com',
                subject: 'Warning from my-monitor',
                params: {
                    ...params,
                    ...values,
                },
            })
        }
    }
}
