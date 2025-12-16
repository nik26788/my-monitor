import { emailEnv } from './email.env'

export const emailConfig = {
    username: emailEnv.MAIL_USERNAME,
    password: emailEnv.MAIL_PASSWORD,
} as const
