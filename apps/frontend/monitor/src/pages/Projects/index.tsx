import { useQuery } from '@tanstack/react-query'
import { type AxiosError, HttpStatusCode } from 'axios'
import React from 'react'

import { Spinner } from '@/components/ui/spinner'
import { useToast } from '@/hooks/user-toast'
import { createApplication, fetchApplicationList, updateApplication } from '@/services/application'
import type { ApplicationData, ApplicationPayload } from '@/types/application'

import { ApplicationModal } from './ApplicationModal'
import ProjectCard from './ProjectCard'

export function Projects() {
    const { toast } = useToast()
    const [editOpen, setEditOpen] = React.useState(false)
    const [editingApp, setEditingApp] = React.useState<ApplicationData | null>(null)

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

    const handleEdit = (app: ApplicationData) => {
        setEditingApp(app)
        setEditOpen(true)
    }

    const handleUpdate = async (payload: ApplicationPayload) => {
        if (!editingApp) {
            return
        }

        try {
            await updateApplication(editingApp.appId, payload)
        } catch (error) {
            const err = error as AxiosError
            toast({
                variant: 'destructive',
                title: err.message || 'Creation Failed',
            })
            return {
                ok: false,
            }
        }

        toast({
            variant: 'success',
            title: 'Updated',
        })

        await refetch()

        return {
            ok: true,
        }
    }

    const handleCreate = async (values: ApplicationPayload) => {
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
                    title: err.message || 'Creation Failed',
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

    const applicationsContent = (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {applications?.map((app, index) => {
                return <ProjectCard key={app.id} application={app} onEdit={handleEdit} index={index} />
            })}
            <ApplicationModal
                mode="edit"
                open={editOpen}
                onOpenChange={open => {
                    setEditOpen(open)
                    if (!open) {
                        setEditingApp(null)
                    }
                }}
                application={editingApp}
                onUpdate={handleUpdate}
            />
        </div>
    )

    const content = applicationsLoading ? (
        <div className="flex justify-center items-center h-full">
            <Spinner />
            <span className="ml-4 text-muted-foreground">Loading</span>
        </div>
    ) : applications?.length ? (
        <div>{applicationsContent}</div>
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
