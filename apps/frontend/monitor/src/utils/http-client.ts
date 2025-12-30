import type { AxiosInstance, AxiosRequestConfig } from 'axios'

import request from './request'

export class HttpClient {
    request: AxiosInstance

    constructor(request: AxiosInstance) {
        this.request = request
    }

    get<T = unknown>(url: string, params = {}, config?: AxiosRequestConfig) {
        return request<unknown, T>({
            method: 'GET',
            url,
            params,
            ...config,
        })
    }

    post<T = unknown>(url: string, data = {}, config?: AxiosRequestConfig) {
        return request<unknown, T>({
            method: 'POST',
            url,
            data,
            ...config,
        })
    }

    put<T = unknown>(url: string, data = {}, config?: AxiosRequestConfig) {
        return request<unknown, T>({
            method: 'PUT',
            url,
            data,
            ...config,
        })
    }

    delete<T = unknown>(url: string, params = {}, config?: AxiosRequestConfig) {
        return request<unknown, T>({
            method: 'DELETE',
            url,
            params,
            ...config,
        })
    }
}

export const httpClient = new HttpClient(request)
