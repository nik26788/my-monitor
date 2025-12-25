import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        // console.log('2. Middleware (before)', req.url)
        next()
        // console.log('2. Middleware (after)', req.url)
    }
}
