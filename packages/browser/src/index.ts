import { Metrics } from '@my-monitor/browser-utils'
import { type Integration, Monitoring } from '@my-monitor/core'

import { Errors } from './integrations/errorsIntegration'
import { BrowserTransport } from './transport'

export function init(options: { dsn: string; integration?: Integration[] }) {
    const monitoring = new Monitoring(options)

    const transport = new BrowserTransport(options.dsn)

    monitoring.init(transport)

    new Errors(transport).init()
    new Metrics(transport).init()

    return monitoring
}
