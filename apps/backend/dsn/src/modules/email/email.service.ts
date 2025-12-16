import fs from 'node:fs'
import path from 'node:path'

import { Inject, Injectable, Logger } from '@nestjs/common'
import { compile } from 'handlebars'
import type { Transporter } from 'nodemailer'

@Injectable()
export class EmailService {
    constructor(@Inject('EMAIL_CLIENT') private readonly emailClient: Transporter) {}

    async alert(params: { to: string; subject: string; params: any }) {
        const alertTemplate = await fs.promises.readFile(path.join(__dirname, '../../templates/email/issue.hbs'), 'utf-8')
        const res = await this.emailClient.sendMail({
            from: 'risin_wangx@163.com',
            to: params.to,
            subject: params.subject,
            html: compile(alertTemplate)(params.params),
        })
        Logger.log('Email sent', res)
    }
}
