import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        if (context.getType() === 'http') {
            return next.handle().pipe(
                map(data => {
                    if (data && typeof data === 'object' && 'code' in data) {
                        return data
                    }
                    return {
                        code: 0,
                        message: 'success',
                        data,
                    }
                })
            )
        }
        return next.handle()
    }
}
