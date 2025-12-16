import { createBrowserRouter } from 'react-router-dom'

import Dashboard from '@/views/Dashboard'
import Login from '@/views/Login'

export const router = createBrowserRouter([
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/account/login',
        element: <Login />,
    },
    {
        path: '/404',
        element: <div>404 not found</div>,
    },
])
