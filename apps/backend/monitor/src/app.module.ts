import { join } from 'node:path'

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LoggerService } from './common/logger/logger.service'
import { postgresConfig } from './config/postgres/postgres.config'
import { AdminModule } from './modules/admin/admin.module'
import { ApplicationModule } from './modules/application/application.module'
import { AuthModule } from './modules/auth/auth.module'
// import { APP_FILTER, APP_GUARD } from '@nestjs/core'
// import { JwtAuthGuard } from './modules/auth/jwt-auth.guard'
// import { RolesGuard } from './common/guards/roles/roles.guard'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...postgresConfig,
            type: 'postgres',
            synchronize: true,
            entities: [join(__dirname, '**/*.entity{.ts,.js}')],
        }),
        ApplicationModule,
        AdminModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        LoggerService,
        // {
        //     provide: APP_GUARD,
        //     useClass: JwtAuthGuard,
        // },
        // {
        //     provide: APP_FILTER,
        //     useClass: HttpExceptionFilter,
        // },
    ],
})
export class AppModule {}
// export class AppModule implements NestModule {
//     configure(consumer: MiddlewareConsumer) {
//         consumer.apply(LoggerMiddleware).forRoutes('*')
//     }
// }
