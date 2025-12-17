import { createBrowserRouter, Outlet } from 'react-router-dom'

import Dashboard from '@/views/Dashboard'
import Login from '@/views/Login'

import AuthRoute from './AuthRoute'

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AuthRoute>
                <Outlet />
            </AuthRoute>
        ),
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/login',
                element: <Login />,
            },
        ],
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
