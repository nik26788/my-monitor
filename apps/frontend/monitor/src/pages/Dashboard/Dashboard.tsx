import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { AppSidebar } from '@/components/app-sidebar'
import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { SectionCards } from '@/components/section-cards'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Spinner } from '@/components/ui/spinner'

interface Application {
    id: string
    name: string
    type: 'vanilla' | 'react' | 'vue'
}

export default function Dashboard() {
    const [isLoading, setIsLoading] = React.useState(false)

    const {
        data: applications,
        isLoading: applicationLoading,
        refetch,
    } = useQuery({
        queryKey: ['application'],
        queryFn: async () => {
            const response = await fetch('/api/application', {
                method: 'GET',
                headers: {
                    token: localStorage.getItem('access_token') || '',
                },
            })
            return response.json()
        },
    })

    // console.log(applications)

    const handleCreate = async () => {
        try {
            setIsLoading(true)
            await fetch('/api/application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('access_token') || '',
                },
                body: JSON.stringify({
                    type: 'react',
                    name: 'react 的应用' + Math.random(),
                }),
            })

            await refetch()
            // eslint-disable-next-line
        } catch (error) {
        } finally {
            setIsLoading(false)
        }
    }

    const handleRemove = async (id: string) => {
        await fetch('/api/application/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('access_token') || '',
            },
        })

        await refetch()
    }

    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': 'calc(var(--spacing) * 72)',
                    '--header-height': 'calc(var(--spacing) * 12)',
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <SectionCards />
                            <div className="px-4 lg:px-6">
                                <ChartAreaInteractive />
                            </div>
                            <div className="p-4">
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
                                            applications.data &&
                                            applications.data.map((item: Application) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td className="px-3">{item.id}</td>
                                                        <td className="px-3">{item.name}</td>
                                                        <td className="px-3">{item.type}</td>
                                                        <td className="px-3">
                                                            <div className="py-1">
                                                                <Button className="bg-red-600" onClick={() => handleRemove(item.id)}>
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
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
