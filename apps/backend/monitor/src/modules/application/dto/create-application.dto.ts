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
