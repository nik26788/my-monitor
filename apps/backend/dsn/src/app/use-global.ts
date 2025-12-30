import { INestApplication } from '@nestjs/common'

import { HttpExceptionFilter } from '../common/filters/http-exception/http-exception.filter'
import { TransformInterceptor } from '../common/interceptors/transform/transform.interceptor'

export default function (app: INestApplication) {
    app.useGlobalFilters(new HttpExceptionFilter())
    app.useGlobalInterceptors(new TransformInterceptor())
}
