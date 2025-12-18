import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateApplicationDto } from './dto/create-application.dto'
import { UpdateApplicationDto } from './dto/update-application.dto'
import { Application } from './entities/application.entity'

@Injectable()
export class ApplicationService {
    constructor(
        @InjectRepository(Application)
        private readonly applicationRepository: Repository<Application>
    ) {}
    async create(createApplicationDto: CreateApplicationDto) {
        const result = await this.applicationRepository.save(createApplicationDto)
        return result
    }

    async findAll() {
        const [data, count] = await this.applicationRepository.findAndCount({
            where: {
                isDelete: false,
            },
        })

        return {
            data,
            count,
        }
    }

    async findOne(id: string) {
        return await this.applicationRepository.findOne({
            where: {
                id,
            },
        })
    }

    update(id: number, updateApplicationDto: UpdateApplicationDto) {
        return `This action updates a #${id} application, ${updateApplicationDto}`
    }

    async remove(id: string) {
        const application = await this.findOne(id)

        if (!application) {
            throw Error('Application is not exist.')
        }

        await this.applicationRepository.update(id, {
            isDelete: true,
        })
    }
}
