import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AdminService } from '../admin/admin.service'

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly adminService: AdminService
    ) {}

    async validateUser(username: string, password: string) {
        return await this.adminService.validateUser({ username, password })
    }

    login(user: { username: string; password: string }) {
        const payload = { username: user.username, password: user.password }
        return { access_token: this.jwtService.sign(payload) }
    }
}
