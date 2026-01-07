import z from 'zod'

/**
 * Update application
 */
export const updateApplicationSchema = z.object({
    appId: z.string(),
})

export type UpdateApplicationDto = z.infer<typeof updateApplicationSchema>
