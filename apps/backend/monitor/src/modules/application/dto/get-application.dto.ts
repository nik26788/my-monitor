import { ApiProperty } from '@nestjs/swagger'
import z from 'zod'

/**
 * Get application
 */
export const getApplicationSchema = z.object({
    id: z.coerce.number(),
})

export type GetApplicationDto = z.infer<typeof getApplicationSchema>

export class GetApplicationDtoClass {
    @ApiProperty({ description: '应用 ID', example: 1 })
    id: number
}
