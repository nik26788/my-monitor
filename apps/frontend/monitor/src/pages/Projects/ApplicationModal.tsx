import { PlusCircle } from 'lucide-react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import type { ApplicationData, ApplicationPayload } from '@/types/application'
import type { FormMode } from '@/types/common'

import { appsOptions } from './meta'

interface ApplicationModalProps {
    mode?: FormMode
    open?: boolean
    onOpenChange?: (open: boolean) => void
    application?: ApplicationData | null
    onCreate?: (values: ApplicationPayload) => Promise<{ ok: boolean; errors?: Record<string, string> }>
    onUpdate?: (values: ApplicationPayload) => Promise<{ ok: boolean; errors?: Record<string, string> }>
}

export function ApplicationModal(props: ApplicationModalProps) {
    const [innerOpen, setInnerOpen] = React.useState(false)

    const open = props.open || innerOpen
    const setOpen = props.onOpenChange || setInnerOpen

    const form = useForm<ApplicationPayload>({
        defaultValues: {
            type: props.application?.type ?? null,
            name: props.application?.name ?? '',
        },
    })

    useEffect(() => {
        if (props.mode === 'edit' && props.application) {
            form.reset({
                type: props.application.type,
                name: props.application.name,
            })
        }
    }, [props.mode, props.application])

    const handleCreate = async (values: ApplicationPayload) => {
        if (props.onCreate) {
            const { ok } = await props.onCreate(values)
            if (ok) {
                form.reset()
                setOpen(false)
            } else {
                // applyServerErrors(form, errors)
            }
        }
    }

    const handleUpdate = async (payload: ApplicationPayload) => {
        if (props.onUpdate && props.application) {
            const { ok } = await props.onUpdate(payload)
            if (ok) {
                form.reset()
                setOpen(false)
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {props.mode === 'create' ? (
                    <Button>
                        <PlusCircle />
                        Create Application
                    </Button>
                ) : (
                    ''
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{props.mode === 'edit' ? 'Update Application' : 'Create a Monitoring Application'}</DialogTitle>
                    <DialogDescription>
                        Please select an application type and input the application name to create a new monitoring application
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="grid items-start gap-4"
                        onSubmit={props.mode === 'edit' ? form.handleSubmit(handleUpdate) : form.handleSubmit(handleCreate)}
                    >
                        <FormField
                            control={form.control}
                            name="type"
                            rules={{
                                required: 'Please input application type',
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Application Type</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value ?? ''}
                                            onValueChange={field.onChange}
                                            disabled={props.mode === 'edit'}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a application type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {appsOptions.map(({ value, label, icon }) => (
                                                        <SelectItem value={value} key={value}>
                                                            <div className="flex flex-row items-center">
                                                                <img src={icon} alt="Vanilla" className="w-6 h-6 mr-2 rounded-sm" />
                                                                <span>{label}</span>
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            rules={{
                                required: 'Please input application name',
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Application Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" onClick={() => form.reset()}>
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && <Spinner />}
                                {props.mode === 'edit' ? 'Save' : 'Create'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
