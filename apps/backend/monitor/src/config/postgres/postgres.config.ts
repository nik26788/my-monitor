import { postgresEnv } from './postgres.env'

export const postgresConfig = {
    host: postgresEnv.POSTGRES_HOST,
    port: postgresEnv.POSTGRES_PORT,
    username: postgresEnv.POSTGRES_USERNAME,
    password: postgresEnv.POSTGRES_PASSWORD,
    database: postgresEnv.POSTGRES_DATABASE,
} as const
