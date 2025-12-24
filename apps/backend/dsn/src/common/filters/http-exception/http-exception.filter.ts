import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const request = host.switchToHttp().getRequest()
        const response = host.switchToHttp().getResponse()
        const status = exception instanceof HttpException ? exception.getStatus() : 500

        response.status(status).send({
            code: status,
            message: exception instanceof HttpException ? exception.message : 'Internal Server Error :(',
            path: request.url,
            timestamp: new Date().toISOString(),
        })
    }
}
