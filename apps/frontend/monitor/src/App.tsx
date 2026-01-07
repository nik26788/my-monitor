import { QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { ConfirmProvider } from '@/components/confirm/ConfirmProvider'

import { Toaster } from './components/ui/toaster'
import { useToast } from './hooks/user-toast'
import { router } from './router'
import { queryClient } from './utils/query-client'
import { registerToastListener } from './utils/toast-emit'

export default function App() {
    const { toast } = useToast()

    useEffect(() => {
        registerToastListener(toast)
    }, [toast])

    return (
        <ConfirmProvider>
            <QueryClientProvider client={queryClient}>
                <Toaster />
                <RouterProvider router={router}></RouterProvider>
            </QueryClientProvider>
        </ConfirmProvider>
    )
}
