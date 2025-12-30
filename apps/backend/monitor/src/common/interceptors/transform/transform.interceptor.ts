import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable, tap } from 'rxjs'

import { LoggerService } from '../../logger/logger.service'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    constructor(private readonly logger: LoggerService) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now()

        if (context.getType() !== 'http') {
            return next.handle()
        }

        const request = context.switchToHttp().getRequest()
        const { method, url, headers, body, query, params } = request

        this.logger.log('Request Info:', {
            url,
            method,
            headers,
            body,
            query,
            params,
            message: 'Request Info',
        })

        return next.handle().pipe(
            tap(() => {
                const responseTime = Date.now() - now
                const response = context.switchToHttp().getResponse()
                const { statusCode } = response

                this.logger.log('Response Info:', {
                    url,
                    method,
                    responseTime: `${responseTime}ms`,
                    statusCode,
                    code: 0,
                    msg: 'success',
                })
            }),
            map((data: unknown) => {
                if (data && typeof data === 'object' && 'code' in data) {
                    return data
                }

                return {
                    code: 0,
                    data,
                    message: 'success',
                }
            })
        )
    }
}
