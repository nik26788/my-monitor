import { useQuery } from '@tanstack/react-query'
import { type AxiosError, HttpStatusCode } from 'axios'

import { Spinner } from '@/components/ui/spinner'
import { useToast } from '@/hooks/user-toast'
import { createApplication, fetchApplicationList } from '@/services/application'
import type { CreateApplicationPayload } from '@/types/application'

import { ApplicationModal } from './ApplicationModal'
import ProjectCard from './ProjectCard'

export function Projects() {
    const { toast } = useToast()
    // const [isLoading, setIsLoading] = React.useState(false)

    const {
        data: applications,
        isLoading: applicationsLoading,
        refetch,
    } = useQuery({
        queryKey: ['application'],
        queryFn: async () => {
            const applicationList = await fetchApplicationList()
            return applicationList.map(app => {
                // TODO  replace mock data with real data
                const data = new Array(7).fill(0).map((_, index) => ({
                    date: new Date(new Date().setDate(new Date().getDate() - index)).toISOString(),
                    resting: Math.floor(Math.random() * (100 - 20) + 20),
                }))
                return {
                    ...app,
                    data,
                }
            })
        },
    })

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

        await refetch()
        return { ok: true }
    }

    const emptyContent = (
        <div className="flex flex-col h-[calc(100vh-200px)] items-center justify-center space-y-4">
            <h1 className="text-xl font-semibold">No applications available</h1>
            <p className="text-gray-500">There are currently no applications, please create new one to get started</p>
            <ApplicationModal mode="create" onCreate={handleCreate} />
        </div>
    )

    const applicationsContent = applications?.map((item, index) => {
        return <ProjectCard key={item.id} application={item} index={index} />
    })

    const content = applicationsLoading ? (
        <div className="flex justify-center items-center h-full">
            <Spinner />
            <span className="ml-4 text-muted-foreground">Loading</span>
        </div>
    ) : applications?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">{applicationsContent}</div>
    ) : (
        emptyContent
    )

    return (
        <div>
            <div className="flex justify-start">
                {applications?.length ? <ApplicationModal mode="create" onCreate={handleCreate} /> : ''}
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6 my-4">{content}</div>
        </div>
    )
}
