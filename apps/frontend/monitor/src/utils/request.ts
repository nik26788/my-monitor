import axios, { AxiosError, type AxiosInstance, type AxiosResponse, HttpStatusCode, type InternalAxiosRequestConfig } from 'axios'

import { emitToast } from './toast-emit'

/**
 * Common response interface
 */
export interface ApiResponse<T = unknown> {
    code: number
    message: string
    data: T
}

/**
 * Create axios instance
 */
const service: AxiosInstance = axios.create({
    baseURL: '/api',
    timeout: 10e3,
    withCredentials: true,
})

const beforeRequest = (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token')
    if (token && config.headers) {
        config.headers.token = token
    }

    return config
}

service.interceptors.request.use(beforeRequest)

const responseSuccess = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
    const { code, data, message } = response.data

    if (code !== 0) {
        throw new Error(message || 'error')
    }

    return data
}

const responseFailed = (error: AxiosError) => {
    const { status } = error

    if (status === HttpStatusCode.Unauthorized) {
        emitToast({
            variant: 'destructive',
            title: 'Your login token has expired, please log in again',
        })
    }

    return Promise.reject(error)
}

service.interceptors.response.use(responseSuccess, responseFailed)

export default service
