import { createBrowserRouter, Navigate } from 'react-router-dom'

import Layout from '@/layout'
import Alerts from '@/views/Alerts'
import Crons from '@/views/Crons'
import Dashboard from '@/views/Dashboard'
import Issues from '@/views/Issues'
import Login from '@/views/Login'
import Performance from '@/views/Performance'
import Projects from '@/views/Projects'

import AuthRoute from './AuthRoute'

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AuthRoute>
                <Layout />
            </AuthRoute>
        ),
        children: [
            {
                path: 'projects',
                element: <Projects />,
            },
            {
                path: 'issues',
                element: <Issues />,
            },
            {
                path: 'performance',
                element: <Performance />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'crons',
                element: <Crons />,
            },
            {
                path: 'alerts',
                element: <Alerts />,
            },
            {
                path: '/',
                element: <Navigate to="/projects" replace />,
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
