import type { Path, UseFormReturn } from 'react-hook-form'

export function applyServerErrors<T>(form: UseFormReturn<T>, errors: Record<string, string> = {}) {
    Object.entries(errors).forEach(([key, message]) => {
        form.setError(key as Path<T>, {
            type: 'server',
            message,
        })
    })
}
