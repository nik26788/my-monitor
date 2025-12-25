import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { nanoid } from 'nanoid'

import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe'
import { ApplicationService } from './application.service'
import { CreateApplicationDto, createApplicationSchema } from './dto/create-application.dto'
import { DeleteApplicationDto, deleteApplicationSchema } from './dto/delete-application.dto'
import { GetApplicationDto, getApplicationSchema } from './dto/get-application.dto'
import { UpdateApplicationDto, updateApplicationSchema } from './dto/update-application.dto'
import { Application } from './entities/application.entity'

@UseGuards(AuthGuard('jwt'))
@Controller('application')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    @Post()
    create(@Body(new ZodValidationPipe(createApplicationSchema)) body: CreateApplicationDto, @CurrentUser() user) {
        const application = new Application(body)
        Reflect.set<Application, 'appId'>(application, 'appId', body.type + nanoid())
        const data = this.applicationService.create({
            ...application,
            userId: user.id,
        })

        return data
    }

    @Get()
    findAll(@CurrentUser() user) {
        Logger.log('Get application by useId ' + user.id, 'ApplicationController')

        return this.applicationService.findAll(user.id)
    }

    @Get(':id')
    findOne(@Param(new ZodValidationPipe(getApplicationSchema)) params: GetApplicationDto) {
        Logger.log('Get application by id ' + params.id, 'ApplicationController')

        return this.applicationService.findOne(params.id)
    }

    @Put(':id')
    update(@Param(new ZodValidationPipe(updateApplicationSchema)) params: UpdateApplicationDto, @Body() body: CreateApplicationDto) {
        Logger.log('Update application by id ' + params.id, 'ApplicationController')
        Logger.log('Update application body' + JSON.stringify(body), 'ApplicationController')

        return this.applicationService.update(params.id, body)
    }

    @Delete(':appId')
    remove(@Param(new ZodValidationPipe(deleteApplicationSchema)) params: DeleteApplicationDto, @CurrentUser() user) {
        Logger.log('Delete application by appId ' + params, 'ApplicationController')

        return this.applicationService.remove({ appId: params.appId, userId: user.id })
    }
}
