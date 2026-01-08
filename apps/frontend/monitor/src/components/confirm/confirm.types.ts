// confirm.types.ts
export interface ConfirmOptions {
    title?: string
    description?: string
    confirmText?: string
    cancelText?: string
    destructive?: boolean
    /**
     * Optional async hook before confirm resolves
     * Throw error to prevent confirm
     */
    beforeConfirm?: () => Promise<void>
}
