export type ApplicationType = 'vanilla' | 'react' | 'vue'

export interface ApplicationData {
    id: number
    type: ApplicationType
    appId: string
    name: string
    bugs: number
    transactions: number
    data: {
        date: string
        resting: number
    }[]
    createAt: Date
}

export interface CreateApplicationPayload {
    type: ApplicationType | null
    name: string
}

export interface UpdateApplicationPayload extends CreateApplicationPayload {
    id: number
}
