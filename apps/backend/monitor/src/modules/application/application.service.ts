import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Application } from './entities/application.entity'

@Injectable()
export class ApplicationService {
    constructor(
        @InjectRepository(Application)
        private readonly applicationRepository: Repository<Application>
    ) {}

    async create(payload) {
        const { name, userId } = payload
        const duplicate = await this.applicationRepository.findOne({
            where: { name, userId },
        })

        if (duplicate) {
            throw new ConflictException('application name already exist')
        }

        try {
            const result = await this.applicationRepository.save(payload)
            Logger.log('result ' + result, 'ApplicationService')

            return result
        } catch (error) {
            Logger.log('error ' + error, 'ApplicationService')
        }
    }

    async findAll(params: { userId: number }) {
        // const [data, count] = await this.applicationRepository
        //     .createQueryBuilder()
        //     .where('app.user_id = :userId', { userId: params.userId })
        //     .getManyAndCount()

        const data = await this.applicationRepository.find({
            where: {
                // userId: params.userId,
                user: { id: params.userId },
            },
            order: {
                createAt: 'DESC',
            },
        })
        // Logger.log(JSON.stringify(data), 'ApplicationService')
        return data
    }

    async findOne(id: number) {
        return await this.applicationRepository.findOne({
            where: { id },
        })
    }

    async update(id: number, payload) {
        const updateAt = new Date().toISOString()
        const result = await this.applicationRepository.update(id, {
            updateAt,
            ...payload,
        })

        if (result.affected === 0) {
            throw new NotFoundException('application not found')
        }

        return true
    }

    async remove(payload: { userId: number; appId: string }) {
        // const application = await this.findOne(appId)

        // if (!application) {
        //     throw new NotFoundException('application not found')
        // }

        // const result = await this.applicationRepository.update(id, {
        //     isDelete: true,
        // })

        const { appId, userId } = payload
        const result = await this.applicationRepository.delete({ appId, user: { id: userId } })
        Logger.log('userId ' + userId, 'ApplicationService')
        Logger.log(result.affected, 'ApplicationService')

        if (result.affected === 0) {
            throw new NotFoundException('application not found')
        }

        return result.raw[0]
    }
}
