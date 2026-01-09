import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'

/**
 * Create application
 */
export const createApplicationSchema = z
    .object({
        type: z.enum(['vanilla', 'react', 'vue']),
        name: z.string(),
        // appId: z.string(),
        // userId: z.number().int().positive(),
    })
    .required()

export type CreateApplicationDto = z.infer<typeof createApplicationSchema>

export class CreateApplicationDtoClass {
    @ApiProperty({ description: '应用类型', enum: ['vanilla', 'react', 'vue'], example: 'react' })
    type: 'vanilla' | 'react' | 'vue'

    @ApiProperty({ description: '应用名称', example: 'My App' })
    name: string
}
