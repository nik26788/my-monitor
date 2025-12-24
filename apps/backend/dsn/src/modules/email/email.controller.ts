import { Controller, Get } from '@nestjs/common'

import { EmailService } from './email.service'

@Controller('email')
export class EmailController {
    constructor(private emailService: EmailService) {}

    @Get('test')
    test() {
        this.emailService.alert({
            to: 'risin_wangxu@qq.com',
            subject: 'test from my-monitor server - dsn',
            params: {},
        })
        return 'done'
    }
}
