import { INestApplication, ValidationPipe } from '@nestjs/common'

import { HttpExceptionFilter } from '../common/filters/http-exception/http-exception.filter'
import { TransformInterceptor } from '../common/interceptors/transform/transform.interceptor'
import { LoggerService } from '../common/logger/logger.service'

export default function (app: INestApplication) {
    const loggerService = app.get(LoggerService)
    app.useGlobalInterceptors(new TransformInterceptor(loggerService))
    app.useGlobalFilters(new HttpExceptionFilter(loggerService))
    app.useGlobalPipes(new ValidationPipe())
}
