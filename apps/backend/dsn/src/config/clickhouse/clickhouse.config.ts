import { clickhouseEnv } from './clickhouse-env.schema'

export const clickhouseConfig = {
    url: clickhouseEnv.CLICKHOUSE_URL,
    username: clickhouseEnv.CLICKHOUSE_USERNAME,
    password: clickhouseEnv.CLICKHOUSE_PASSWORD,
} as const
