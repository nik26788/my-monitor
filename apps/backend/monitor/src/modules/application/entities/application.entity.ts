import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('application')
export class Application {
    @PrimaryGeneratedColumn()
    id: string

    @Column({ type: 'varchar', length: 80 })
    name: string

    @Column({ type: 'enum', enum: ['vanilla', 'react', 'vue'] })
    type: 'vanilla' | 'react' | 'vue'

    @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    createAt?: Date

    @Column({ default: false })
    isDelete: boolean
}
