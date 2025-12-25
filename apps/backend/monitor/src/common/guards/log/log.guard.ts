import { CanActivate, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class LogGuard implements CanActivate {
    canActivate(/* context: ExecutionContext */): boolean | Promise<boolean> | Observable<boolean> {
        // console.log('3. Guard - Log')
        return true
    }
}
