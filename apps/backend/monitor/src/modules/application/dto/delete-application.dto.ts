import { ApiProperty } from '@nestjs/swagger'
import z from 'zod'

/**
 * Delete application
 */
export const deleteApplicationSchema = z.object({
    appId: z.string(),
})

export type DeleteApplicationDto = z.infer<typeof deleteApplicationSchema>

export class DeleteApplicationDtoClass {
    @ApiProperty({ description: '应用 ID', example: 'react123456' })
    appId: string
}
