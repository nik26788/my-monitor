import { Bug, CalendarCheck, Lightbulb, Package, Siren, Zap } from 'lucide-react'
import * as React from 'react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'

const issues = [1, 2]

const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
        {
            name: 'projects',
            title: 'Projects',
            icon: Package,
            gap: true,
        },
        {
            name: 'issues',
            title: 'Issues',
            icon: Bug,
            badge: issues.length || 0,
        },
        {
            name: 'performance',
            title: 'Performance',
            icon: Zap,
            gap: true,
        },
        {
            name: 'dashboard',
            title: 'Dashboard',
            icon: Lightbulb,
        },
        {
            name: 'crons',
            title: 'Crons',
            icon: CalendarCheck,
        },
        {
            name: 'alerts',
            title: 'Alerts',
            icon: Siren,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <a href="/" className="flex item-center gap-2">
                                <img src="/logo.png" className="w-10" />
                                <span className="text-base font-semibold">Web Monitor.</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
