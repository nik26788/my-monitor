type ToastPayload = {
    title: string
    description?: string
    variant?: 'default' | 'destructive'
}

type ToastListener = (payload: ToastPayload) => void

let listener: ToastListener | null = null

export function registerToastListener(fn: ToastListener) {
    listener = fn
}

export function emitToast(payload: ToastPayload) {
    listener?.(payload)
}
