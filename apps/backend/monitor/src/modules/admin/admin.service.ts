import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Admin } from './entities/admin.entity'

@Injectable()
export class AdminService {
    constructor(@InjectRepository(Admin) private readonly adminRepository: Repository<Admin>) {}

    async validateUser(params: { username: string; password: string }) {
        const admin = await this.adminRepository.findOne({ where: { username: params.username, password: params.password } })

        return admin
    }

    async registerUser(username: string, password: string) {
        const result = await this.adminRepository.save({
            username,
            password,
        })

        return result
    }
}
