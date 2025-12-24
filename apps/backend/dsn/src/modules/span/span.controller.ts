import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { SpanService } from './span.service'

@Controller()
export class SpanController {
    constructor(private readonly spanService: SpanService) {}

    @Get('tracking/list')
    async list() {
        const result = await this.spanService.list()
        return result
    }

    @Post('tracking/:app_id')
    tracking(@Param() { app_id }: { app_id: string }, @Body() params: { event_type: string; message?: string }) {
        return this.spanService.tracking(app_id, params)
    }
}
