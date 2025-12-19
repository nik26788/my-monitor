import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('admin')
export class Admin {
    @PrimaryGeneratedColumn()
    id: string

    @Column({ type: 'varchar', length: 80 })
    username: string

    @Column({ type: 'varchar', length: 80 })
    password: string
}
