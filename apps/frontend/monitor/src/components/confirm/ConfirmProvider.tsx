import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'

import { ConfirmContext } from './confirm.context'
import type { ConfirmOptions } from './confirm.types'

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false)
    const [options, setOptions] = React.useState<ConfirmOptions>({})
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const resolver = React.useRef<((value: boolean) => void) | null>(null)

    const confirm: (opts?: ConfirmOptions) => Promise<boolean> = (opts = {}) => {
        setOptions(opts)
        setError(null)
        setOpen(true)

        return new Promise<boolean>(resolve => {
            resolver.current = resolve
        })
    }

    const cleanup = () => {
        setOpen(false)
        setLoading(false)
        setError(null)
        setOptions({})
        resolver.current = null
    }

    const handleCancel = () => {
        resolver.current?.(false)
        cleanup()
    }

    const handleConfirm = async () => {
        setLoading(true)

        try {
            if (options.beforeConfirm) {
                await options.beforeConfirm()
            }
            resolver.current?.(true)
            cleanup()
        } catch (err) {
            // ⭐ 阻止关闭，展示错误
            setError(err instanceof Error ? err.message : 'Something went wrong')
            setLoading(false)
        }
    }

    return (
        <ConfirmContext.Provider value={confirm}>
            {children}

            <Dialog open={open} onOpenChange={v => !v && handleCancel()}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{options.title ?? 'Are you sure?'}</DialogTitle>
                        {options.description && <DialogDescription>{options.description}</DialogDescription>}
                    </DialogHeader>

                    <DialogFooter className="flex flex-col gap-2">
                        {error && <p className="text-sm text-red-600 text-left">{error}</p>}
                        <Button variant="outline" onClick={handleCancel}>
                            {options.cancelText ?? 'Cancel'}
                        </Button>
                        <Button variant={options.destructive ? 'destructive' : 'default'} onClick={handleConfirm} disabled={loading}>
                            {loading && <Spinner />}
                            {options.confirmText ?? 'Confirm'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </ConfirmContext.Provider>
    )
}
