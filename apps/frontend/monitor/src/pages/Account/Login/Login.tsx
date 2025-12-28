import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { LoginForm } from '@/components/login-form'
export default function Page() {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')

    const login = async (formData: FormData) => {
        // const response = await fetch('/api/admin/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         username: formData.get('username'),
        //         password: formData.get('password'),
        //     }),
        // })
        //
        // const response = await fetch(`/api/admin/validate?username=${formData.get('username')}&password=${formData.get('password')}`, {
        //     method: 'GET',
        // })

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.get('username'),
                password: formData.get('password'),
            }),
        })

        const { code, data } = await response.json()

        if (code === 0 && data.access_token) {
            localStorage.setItem('access_token', data.access_token)
            navigate('/projects')
            setErrorMessage('')
        } else {
            const { message } = data
            setErrorMessage(message)
        }
    }
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm onLogin={login} errorMessage={errorMessage} />
            </div>
        </div>
    )
}
