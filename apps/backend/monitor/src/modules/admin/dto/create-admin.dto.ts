import z from 'zod'

export const createAdminSchema = z
    .object({
        username: z.string(),
        password: z.string(),
    })
    .required()

export type CreateAdminDto = z.infer<typeof createAdminSchema>
