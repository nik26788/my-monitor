import z from 'zod'

/**
 * Delete application
 */
export const deleteApplicationSchema = z.object({
    appId: z.string(),
})

export type DeleteApplicationDto = z.infer<typeof deleteApplicationSchema>
