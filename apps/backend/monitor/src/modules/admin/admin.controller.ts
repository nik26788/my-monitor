import { Body, Controller, Get, Post, Query } from '@nestjs/common'

import { AdminService } from './admin.service'

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get('validate')
    validateUser(@Query() query: { username: string; password: string }) {
        return this.adminService.validateUser(query)
    }

    @Post('register')
    registerUser(@Body() params: { username: string; password: string }) {
        const { username, password } = params
        return this.adminService.registerUser(username, password)
    }
}
