import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Admin } from '../../admin/entities/admin.entity'

@Entity('application')
export class Application {
    constructor(partial: Partial<Application>) {
        Object.assign(this, partial)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 80 })
    appId: string

    @Column({ type: 'varchar', length: 80 })
    name: string

    @Column({ type: 'enum', enum: ['vanilla', 'react', 'vue'] })
    type: 'vanilla' | 'react' | 'vue'

    @Column({ type: 'text', nullable: true })
    description: string

    @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date

    @Column({ nullable: true })
    updateAt: Date

    @Column({ default: false })
    isDelete: boolean

    @ManyToOne('Admin', 'applications')
    user: Admin

    @Column({ type: 'int' })
    userId: number
}
