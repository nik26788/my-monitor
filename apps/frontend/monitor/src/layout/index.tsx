import React from 'react'
import { Outlet } from 'react-router-dom'

import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function Dashboard() {
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
                <div className="flex flex-col overflow-y-auto relative">
                    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        <Outlet />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
