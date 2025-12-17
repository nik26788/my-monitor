import type React from 'react'
import type { JSX } from 'react'
import { Navigate } from 'react-router-dom'

interface AuthRouteProps {
    children: JSX.Element
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
    if (!localStorage.getItem('token')) {
        return <Navigate to={`account/login?redirect=${window.location.pathname}`} />
    }
    return children
}

export default AuthRoute
