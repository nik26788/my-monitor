import type { ApplicationData, CreateApplicationPayload } from '@/types/application'
import { httpClient } from '@/utils/http-client'

export const fetchApplicationList = () => {
    return httpClient.get<ApplicationData[]>('/application')
}

export const removeApplication = (appId: string) => {
    return httpClient.delete<boolean>('/application/' + appId)
}

export const createApplication = (payload: CreateApplicationPayload) => {
    return httpClient.post('/application', payload)
}
