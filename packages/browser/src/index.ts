import { init as browserUtilsInit } from '@my-monitor/browser-utils'

import { Errors } from './integrations/errorsIntegration'

const errors = new Errors()

export function init() {
    browserUtilsInit()
    errors.init()
}
