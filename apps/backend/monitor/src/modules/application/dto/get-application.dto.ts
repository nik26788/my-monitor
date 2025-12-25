import z from 'zod'

/**
 * Get application
 */
export const getApplicationSchema = z.object({
    id: z.coerce.number(),
})

export type GetApplicationDto = z.infer<typeof getApplicationSchema>
