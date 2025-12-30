import { createClient } from '@clickhouse/client'
import { DynamicModule, Global, Module } from '@nestjs/common'

@Global()
@Module({})
export class ClickhouseModule {
    static forRoot(options: { url: string; username: string; password: string }): DynamicModule {
        return {
            module: ClickhouseModule,
            providers: [
                {
                    provide: 'CLICKHOUSE_CLIENT',
                    useFactory: async () => {
                        const client = createClient(options)
                        await client.ping()
                        return client
                    },
                },
            ],
            exports: ['CLICKHOUSE_CLIENT'],
        }
    }
}
