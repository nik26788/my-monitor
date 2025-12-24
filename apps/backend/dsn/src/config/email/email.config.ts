import { emailEnv } from './email.env'

export const emailConfig = {
    host: emailEnv.MAIL_HOST,
    port: emailEnv.MAIL_PORT,
    secure: emailEnv.MAIL_SECURE,
    auth: {
        user: emailEnv.MAIL_USERNAME,
        pass: emailEnv.MAIL_PASSWORD,
    },
} as const
