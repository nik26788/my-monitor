import { z } from 'zod'

const postgresEnvSchema = z.object({
    POSTGRES_HOST: z.string().min(1),
    POSTGRES_PORT: z.coerce.number().int().positive(),
    POSTGRES_USERNAME: z.string().min(1),
    POSTGRES_PASSWORD: z.string().min(1),
    POSTGRES_DATABASE: z.string().min(1),
})

export const postgresEnv = postgresEnvSchema.parse(process.env)

export type PostgresEnv = z.infer<typeof postgresEnvSchema>
