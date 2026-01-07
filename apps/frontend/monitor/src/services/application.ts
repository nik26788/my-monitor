import type { ApplicationData, ApplicationPayload } from '@/types/application'
import { httpClient } from '@/utils/http-client'

export const fetchApplicationList = () => {
    return httpClient.get<ApplicationData[]>('/application')
}

export const removeApplication = (appId: string) => {
    return httpClient.delete<boolean>('/application/' + appId)
}

export const createApplication = (payload: ApplicationPayload) => {
    return httpClient.post('/application', payload)
}

export const updateApplication = (appId: string, payload: ApplicationPayload) => {
    return httpClient.put(`/application/${appId}`, payload)
}

export const deleteApplication = (appId: string) => {
    return httpClient.delete(`/application/${appId}`)
}
