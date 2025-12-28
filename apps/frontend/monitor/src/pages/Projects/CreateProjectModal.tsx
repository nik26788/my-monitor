import { PlusCircle } from 'lucide-react'
import React from 'react'
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
import type { CreateApplicationPayload } from '@/types/application'

import { appsOptions } from './meta'

interface CreateProjectModalProps {
    onCreateProject: (values: CreateApplicationPayload) => Promise<{ ok: boolean; errors?: Record<string, string> }>
}

export function CreateApplicationModal(props: CreateProjectModalProps) {
    const form = useForm<CreateApplicationPayload>({
        defaultValues: {
            type: null,
            name: '',
        },
    })
    const [open, setOpen] = React.useState(false)

    const handleCreateProject = async (values: CreateApplicationPayload) => {
        const { ok } = await props.onCreateProject(values)
        if (ok) {
            form.reset()
            setOpen(false)
        } else {
            // applyServerErrors(form, errors)
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle />
                    Create Application
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create a Monitoring Application</DialogTitle>
                    <DialogDescription>
                        Please select an application type and input the application name to create a new monitoring application
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="grid items-start gap-4" onSubmit={form.handleSubmit(handleCreateProject)}>
                        <FormField
                            control={form.control}
                            name="type"
                            rules={{ required: 'Please input application type' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Application Type</FormLabel>
                                    <FormControl>
                                        <Select {...field} value={field.value ?? ''} onValueChange={field.onChange}>
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
                            rules={{ required: 'Please input application name' }}
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
                                Save changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
