import { join } from 'node:path'

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { postgresConfig } from './config/postgres/postgres.config'
import { ApplicationModule } from './modules/application/application.module'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: postgresConfig.host,
            port: postgresConfig.port,
            username: postgresConfig.username,
            password: postgresConfig.password,
            database: postgresConfig.database,
            entities: [join(__dirname, '**/*.entity{.ts,.js}')],
            synchronize: true,
        }),
        ApplicationModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
