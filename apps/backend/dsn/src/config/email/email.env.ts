import { z } from 'zod'

const emailEnvSchema = z.object({
    MAIL_USERNAME: z.string(),
    MAIL_PASSWORD: z.string(),
})

export const emailEnv = emailEnvSchema.parse(process.env)

export type EmailEnv = z.infer<typeof emailEnvSchema>
