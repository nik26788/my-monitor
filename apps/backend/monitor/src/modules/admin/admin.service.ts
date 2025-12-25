import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateAdminDto } from './dto/create-admin.dto'
import { Admin } from './entities/admin.entity'

@Injectable()
export class AdminService {
    constructor(@InjectRepository(Admin) private readonly adminRepository: Repository<Admin>) {}

    async validateUser(params: { username: string; password: string }) {
        const { username, password } = params
        const admin = await this.adminRepository.findOne({
            where: {
                username,
                password,
            },
        })
        return admin
    }

    async registerUser(params: CreateAdminDto) {
        const username = params.username
        const findUser = await this.adminRepository.findOne({ where: { username } })

        if (findUser) {
            throw new HttpException('user already exist', HttpStatus.CONFLICT)
        }

        const result = await this.adminRepository.save(params)
        return result.id
    }
}
