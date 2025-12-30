import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { finalize, Observable } from 'rxjs'

@Injectable()
export class LogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now()
        return next.handle().pipe(
            finalize(() => {
                if (context.getType() === 'http') {
                    const response = context.switchToHttp().getResponse()
                    const request = context.switchToHttp().getRequest()
                    Logger.log([request.method, request.url, response.statusCode, '-', Date.now() - now, 'ms'].join(' '))
                }
            })
        )
    }
}
