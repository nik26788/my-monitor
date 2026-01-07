import copyText from 'copy-text-to-clipboard'
import { lightFormat } from 'date-fns'
import { Copy, MoreHorizontalIcon, Pencil, Trash } from 'lucide-react'
import React from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useToast } from '@/hooks/user-toast'
import type { ApplicationData } from '@/types/application'

import { appLogoMap } from './meta'

interface ProjectCardProps {
    application: ApplicationData
    onEdit: (app: ApplicationData) => void
    onDelete: (app: ApplicationData) => void
    index: number
}
function ProjectCard({ application, onEdit, onDelete, index }: ProjectCardProps) {
    const { toast } = useToast()
    const copyAppId = (appId: string) => {
        copyText(appId)
        toast({
            variant: 'success',
            title: 'Copied App ID',
        })
    }

    return (
        <Card className="w-full gap-4 py-4">
            <CardHeader className="gap-0">
                <div className="flex items-center h-[48px]">
                    <img className="w-8 h-8 object-cover rounded-sm mr-3" src={appLogoMap[application.type]} alt="Project" />

                    <div className="flex flex-1 flex-col justify-center gap-1 items-stretch h-full">
                        <CardTitle>{application.name}</CardTitle>
                        <CardDescription>
                            Bugs {application.bugs} | Events {application.transactions}
                        </CardDescription>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon-sm" aria-label="Open Menu">
                                <MoreHorizontalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEdit(application)}>
                                <Pencil /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => onDelete(application)}>
                                <Trash /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="p-0 bg-muted">
                <ChartContainer
                    config={{
                        resting: {
                            label: 'Resting',
                            color: `var(--chart-${index + 1})`,
                        },
                    }}
                    className="h-[150px] w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={application.data}
                        margin={{
                            left: 18,
                            right: 18,
                            top: 10,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="4 4" />
                        <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={value => {
                                return new Date(value).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                })
                            }}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Line dataKey="resting" type="natural" stroke="var(--color-resting)" strokeWidth={2} dot={false} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex items-center gap-4">
                <p className="flex-none w-[110px] text-xs">{lightFormat(application.createAt, 'yyyy-MM-dd HH:mm:ss')}</p>
                <Button variant="secondary" className="flex min-w-0 flex-1 items-center gap-2" onClick={() => copyAppId(application.appId)}>
                    <p className="min-w-0 truncate text-xs text-left">{application.appId}</p>
                    <Copy className="shrink-0" />
                </Button>
            </CardFooter>
        </Card>
    )
}

export default React.memo(ProjectCard)
