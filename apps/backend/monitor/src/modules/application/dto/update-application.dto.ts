import z from 'zod'

/**
 * Update application
 */
export const updateApplicationSchema = z.object({
    id: z.coerce.number(),
})

export type UpdateApplicationDto = z.infer<typeof updateApplicationSchema>
