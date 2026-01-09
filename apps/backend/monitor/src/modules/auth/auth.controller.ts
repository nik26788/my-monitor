import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe'
import { AdminService } from '../admin/admin.service'
import { CreateAdminDto, CreateAdminDtoClass, createAdminSchema } from '../admin/dto/create-admin.dto'
import { AuthService } from './auth.service'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly adminService: AdminService,
        private readonly authService: AuthService
    ) {}

    @Post('signup')
    @ApiOperation({ summary: '用户注册' })
    @ApiBody({ type: CreateAdminDtoClass })
    @ApiResponse({ status: 201, description: '注册成功' })
    @ApiResponse({ status: 400, description: '请求参数错误' })
    @UsePipes(new ZodValidationPipe(createAdminSchema))
    signup(@Body() params: CreateAdminDto) {
        return this.adminService.registerUser(params)
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiOperation({ summary: '用户登录' })
    @ApiResponse({ status: 200, description: '登录成功，返回 JWT token' })
    @ApiResponse({ status: 401, description: '用户名或密码错误' })
    async login(@CurrentUser() user) {
        return this.authService.sign(user)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: '用户登出' })
    @ApiResponse({ status: 200, description: '登出成功' })
    @ApiResponse({ status: 401, description: '未授权' })
    async logout() {
        return true
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: '获取当前用户信息' })
    @ApiResponse({ status: 200, description: '获取成功' })
    @ApiResponse({ status: 401, description: '未授权' })
    async getProfile(@CurrentUser() user) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user
        return rest
    }
}
