import { z } from 'zod'

const clickhouseEnvSchema = z.object({
    CLICKHOUSE_URL: z.string(),
    CLICKHOUSE_USERNAME: z.string(),
    CLICKHOUSE_PASSWORD: z.string(),
})

export const clickhouseEnv = clickhouseEnvSchema.parse(process.env)

export type ClickHouseEnv = z.infer<typeof clickhouseEnvSchema>
