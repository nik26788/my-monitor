import { getBrowserInfo } from '@my-monitor/browser-utils'
import { Transport } from '@my-monitor/core'

export class BrowserTransport implements Transport {
    constructor(private dsn: string) {}

    send(data: Record<string, unknown>) {
        const browserInfo = getBrowserInfo()

        const payload = {
            ...data,
            browserInfo,
        }

        fetch(this.dsn, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).catch(err => console.error('Failed to send data', err))
    }
}

/**
 * implement based on count and period transport
 */

// export class BrowserTransport implements Transport {
//     constructor(private dsn: string) {}
//
//     private batchSize = 10
//     private batch: Record<string, unknown>[] = []
//
//     send(data: Record<string, unknown>) {
//         const browserInfo = getBrowserInfo()
//
//         const payload = {
//             ...data,
//             browserInfo,
//         }
//
//         if (this.batch.length >= this.batchSize) {
//             this.flush()
//         }
//     }
//
//     flush() {
//         const batchItems = this.batch.slice(0, this.batchSize)
//         this.batch = this.batch.slice(this.batchSize)
//
//         fetch(this.dsn, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(batchItems),
//         }).catch(err => console.error('Failed to send data', err))
//     }
// }
