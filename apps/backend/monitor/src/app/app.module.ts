import { join } from 'node:path'

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LoggerService } from '../common/logger/logger.service'
import { postgresConfig } from '../config/postgres/postgres.config'
import { AdminModule } from '../modules/admin/admin.module'
import { ApplicationModule } from '../modules/application/application.module'
import { AuthModule } from '../modules/auth/auth.module'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...postgresConfig,
            type: 'postgres',
            synchronize: true,
            entities: [join(__dirname, '..', '**/*.entity{.ts,.js}')],
        }),
        ApplicationModule,
        AdminModule,
        AuthModule,
    ],
    providers: [LoggerService],
})
export class AppModule {}
