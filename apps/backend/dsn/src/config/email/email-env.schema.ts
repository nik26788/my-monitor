import { z } from 'zod'

const emailEnvSchema = z.object({
    MAIL_HOST: z.string(),
    MAIL_PORT: z.coerce.number().int().positive(),
    MAIL_SECURE: z.enum(['true', 'false']).transform(value => value === 'true'),
    MAIL_USERNAME: z.string(),
    MAIL_PASSWORD: z.string(),
})

export const emailEnv = emailEnvSchema.parse(process.env)

export type EmailEnv = z.infer<typeof emailEnvSchema>
