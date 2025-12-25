import { z } from 'zod'

const postgresEnvSchema = z.object({
    POSTGRES_HOST: z.string(),
    POSTGRES_PORT: z.coerce.number().int().positive(),
    POSTGRES_USERNAME: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DATABASE: z.string(),
})

export const postgresEnv = postgresEnvSchema.parse(process.env)

export type PostgresEnv = z.infer<typeof postgresEnvSchema>
