import { ApiProperty } from '@nestjs/swagger'
import z from 'zod'

export const createAdminSchema = z
    .object({
        username: z.string(),
        password: z.string(),
    })
    .required()

export type CreateAdminDto = z.infer<typeof createAdminSchema>

export class CreateAdminDtoClass {
    @ApiProperty({ description: '用户名', example: 'admin' })
    username: string

    @ApiProperty({ description: '密码', example: 'password123' })
    password: string
}
