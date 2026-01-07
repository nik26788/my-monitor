// confirm.context.ts
import { createContext } from 'react'

import type { ConfirmOptions } from './confirm.types'

export type ConfirmFn = (options?: ConfirmOptions) => Promise<boolean>

export const ConfirmContext = createContext<ConfirmFn | null>(null)
