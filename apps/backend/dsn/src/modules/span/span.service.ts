import { ClickHouseClient } from '@clickhouse/client'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class SpanService {
    constructor(@Inject('CLICKHOUSE_CLIENT') private readonly clickhouseClient: ClickHouseClient) {}

    async tracking(app_id, params: { event_type: string; message?: string }) {
        const { event_type, message, ...rest } = params

        const values = {
            app_id,
            event_type,
            message,
            info: rest,
        }

        await this.clickhouseClient.insert({
            table: 'nick.base_monitor_storage',
            values,
            columns: ['app_id', 'event_type', 'message', 'info'],
            format: 'JSONEachRow',
        })
    }
}
