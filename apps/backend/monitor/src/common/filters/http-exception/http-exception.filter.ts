import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'

import { LoggerService } from '../../logger/logger.service'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggerService) {}
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest()
        const response = ctx.getResponse()
        const status = exception instanceof HttpException ? exception.getStatus() : 500

        let validMessage = ''

        if (exception instanceof HttpException) {
            validMessage = typeof exception.message === 'string' ? exception.message : exception.message[0]
        }

        let message = ''
        if (exception.message) {
            message = exception.message
        } else {
            message = `${status >= 500 ? 'Service Error' : 'Client Error'}`
        }

        const errorResponse = {
            code: status,
            path: request.url,
            timestamp: new Date().toISOString(),
            message: validMessage || message,
        }
        response.status(status).send({ ...errorResponse })

        const { method, url } = request
        this.logger.log('Response Info:', { url, method, statusCode: status, message: errorResponse.message })
    }
}
