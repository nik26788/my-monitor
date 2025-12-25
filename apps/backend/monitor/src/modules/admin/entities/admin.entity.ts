import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
// import { Application } from '../../application/entities/application.entity'

@Entity('admin')
export class Admin {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 80 })
    username: string

    @Column({ type: 'varchar', length: 80 })
    password: string

    @Column({ nullable: true })
    email: string

    @Column({ nullable: true })
    phone: string

    @Column({ nullable: true })
    role: string

    // @OneToMany(() => Application, app => app.user)
    // applications: Application[]
}
