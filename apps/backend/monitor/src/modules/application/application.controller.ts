import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { nanoid } from 'nanoid'

import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe'
import { ApplicationService } from './application.service'
import { CreateApplicationDto, CreateApplicationDtoClass, createApplicationSchema } from './dto/create-application.dto'
import { DeleteApplicationDto, deleteApplicationSchema } from './dto/delete-application.dto'
import { GetApplicationDto, getApplicationSchema } from './dto/get-application.dto'
import { UpdateApplicationDto, updateApplicationSchema } from './dto/update-application.dto'
import { Application } from './entities/application.entity'

@ApiTags('application')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('jwt'))
@Controller('application')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    @Post()
    @ApiOperation({ summary: '创建应用' })
    @ApiBody({ type: CreateApplicationDtoClass })
    @ApiResponse({ status: 201, description: '创建成功' })
    @ApiResponse({ status: 400, description: '请求参数错误' })
    @ApiResponse({ status: 401, description: '未授权' })
    create(@Body(new ZodValidationPipe(createApplicationSchema)) body: CreateApplicationDto, @CurrentUser() user) {
        const application = new Application(body)
        application.appId = body.type + nanoid()
        application.userId = user.id
        // Reflect.set<Application, 'appId'>(application, 'appId', body.type + nanoid())
        const data = this.applicationService.create({
            ...application,
            // userId: user.id,
        })

        return data
    }

    @Get()
    @ApiOperation({ summary: '获取当前用户的所有应用' })
    @ApiResponse({ status: 200, description: '获取成功' })
    @ApiResponse({ status: 401, description: '未授权' })
    findAll(@CurrentUser() user) {
        Logger.log('Get application by useId ' + user.id, 'ApplicationController')

        return this.applicationService.findAll({ userId: user.id })
    }

    @Get(':id')
    @ApiOperation({ summary: '根据 ID 获取应用详情' })
    @ApiParam({ name: 'id', type: Number, description: '应用 ID', example: 1 })
    @ApiResponse({ status: 200, description: '获取成功' })
    @ApiResponse({ status: 400, description: '请求参数错误' })
    @ApiResponse({ status: 401, description: '未授权' })
    @ApiResponse({ status: 404, description: '应用不存在' })
    findOne(@Param(new ZodValidationPipe(getApplicationSchema)) params: GetApplicationDto) {
        Logger.log('Get application by id ' + params.id, 'ApplicationController')

        return this.applicationService.findOne(params.id)
    }

    @Put(':appId')
    @ApiOperation({ summary: '更新应用信息' })
    @ApiParam({ name: 'appId', type: String, description: '应用 ID', example: 'react123456' })
    @ApiBody({ type: CreateApplicationDtoClass })
    @ApiResponse({ status: 200, description: '更新成功' })
    @ApiResponse({ status: 400, description: '请求参数错误' })
    @ApiResponse({ status: 401, description: '未授权' })
    @ApiResponse({ status: 404, description: '应用不存在' })
    update(@Param(new ZodValidationPipe(updateApplicationSchema)) params: UpdateApplicationDto, @Body() body: CreateApplicationDto) {
        Logger.log('Update application by appId ' + params.appId, 'ApplicationController')
        Logger.log('Update application body' + JSON.stringify(body), 'ApplicationController')

        return this.applicationService.update(params.appId, body)
    }

    @Delete(':appId')
    @ApiOperation({ summary: '删除应用' })
    @ApiParam({ name: 'appId', type: String, description: '应用 ID', example: 'react123456' })
    @ApiResponse({ status: 200, description: '删除成功' })
    @ApiResponse({ status: 400, description: '请求参数错误' })
    @ApiResponse({ status: 401, description: '未授权' })
    @ApiResponse({ status: 404, description: '应用不存在' })
    remove(@Param(new ZodValidationPipe(deleteApplicationSchema)) params: DeleteApplicationDto, @CurrentUser() user) {
        Logger.log('Delete application by appId ' + JSON.stringify(params), 'ApplicationController')
        return this.applicationService.remove({ appId: params.appId, userId: user.id })
    }
}
