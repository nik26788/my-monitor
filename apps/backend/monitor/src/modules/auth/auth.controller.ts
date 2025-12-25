import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe'
import { AdminService } from '../admin/admin.service'
import { CreateAdminDto, createAdminSchema } from '../admin/dto/create-admin.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly adminService: AdminService,
        private readonly authService: AuthService
    ) {}

    @Post('signup')
    @UsePipes(new ZodValidationPipe(createAdminSchema))
    signup(@Body() params: CreateAdminDto) {
        return this.adminService.registerUser(params)
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@CurrentUser() user) {
        return this.authService.sign(user)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    async logout() {
        return true
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    async getProfile(@CurrentUser() user) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user
        return rest
    }
}
