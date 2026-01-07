import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { createApplication, fetchApplicationList, removeApplication } from '@/services/application'
import type { ApplicationData, ApplicationPayload } from '@/types/application'

function ApplicationList() {
    const [isLoading, setIsLoading] = React.useState(false)
    const {
        data: applications,
        isLoading: applicationLoading,
        refetch,
    } = useQuery({
        queryKey: ['application'],
        queryFn: async () => {
            return await fetchApplicationList()
        },
    })

    // console.log(applications)

    const handleCreate = async () => {
        try {
            setIsLoading(true)

            const params: ApplicationPayload = { name: 'react' + Math.random(), type: 'react' }
            await createApplication(params)
            await refetch()
            // eslint-disable-next-line
        } catch (error) {
        } finally {
            setIsLoading(false)
        }
    }

    const handleRemove = async (appId: string) => {
        await removeApplication(appId)
        await refetch()
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applications &&
                        applications.map((item: ApplicationData) => {
                            return (
                                <tr key={item.id}>
                                    <td className="px-3">{item.id}</td>
                                    <td className="px-3">{item.name}</td>
                                    <td className="px-3">{item.type}</td>
                                    <td className="px-3">
                                        <div className="py-1">
                                            <Button className="bg-red-600" onClick={() => handleRemove(item.appId)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            {applicationLoading && <Spinner />}
            <Button className="mt-3" onClick={handleCreate} disabled={isLoading}>
                {isLoading && <Spinner />}
                Create Application
            </Button>
        </div>
    )
}

export default React.memo(ApplicationList)
