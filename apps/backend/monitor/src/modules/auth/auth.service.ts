import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AdminService } from '../admin/admin.service'
// import { AuthGuard } from '@nestjs/passport'

// @UseGuards(AuthGuard('jwt'))
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly adminService: AdminService
    ) {}

    async validateUser(username: string, password_: string) {
        const admin = await this.adminService.validateUser({ username, password: password_ })
        if (admin) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...rest } = admin
            return rest
        }

        return null
    }

    sign(user: { username: string; password: string }) {
        const payload = { username: user.username, password: user.password }
        return { access_token: this.jwtService.sign(payload) }
    }
}
