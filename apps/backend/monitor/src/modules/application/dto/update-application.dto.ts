import { ApiProperty } from '@nestjs/swagger'
import z from 'zod'

/**
 * Update application
 */
export const updateApplicationSchema = z.object({
    appId: z.string(),
})

export type UpdateApplicationDto = z.infer<typeof updateApplicationSchema>

export class UpdateApplicationDtoClass {
    @ApiProperty({ description: '应用 ID', example: 'react123456' })
    appId: string
}
