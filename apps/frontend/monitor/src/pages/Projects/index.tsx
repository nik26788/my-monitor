import { type AxiosError, HttpStatusCode } from 'axios'

import { useToast } from '@/hooks/user-toast'
import { createApplication } from '@/services/application'
import type { CreateApplicationPayload } from '@/types/application'

import { CreateApplicationModal } from './CreateProjectModal'

export function Projects() {
    const { toast } = useToast()
    const handleCreate = async (values: CreateApplicationPayload) => {
        try {
            await createApplication(values)
        } catch (error) {
            const err = error as AxiosError
            if (err.status === HttpStatusCode.Conflict) {
                toast({
                    variant: 'destructive',
                    title: 'Application already exist',
                })
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Creation Failed',
                })
            }
            return { ok: false }
        }

        toast({
            variant: 'success',
            title: 'Created',
        })

        // await refetch()
        return { ok: true }
    }

    return (
        <div>
            <CreateApplicationModal onCreateProject={handleCreate} />
        </div>
    )
}
