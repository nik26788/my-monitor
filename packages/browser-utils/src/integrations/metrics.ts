import { Transport } from '@my-monitor/core'

import { onCLS, onFCP, onINP, onLCP, onTTFB } from '../metrics'

export class Metrics {
    constructor(private transport: Transport) {}
    init() {
        window.addEventListener('load', () => {
            ;[onCLS, onFCP, onINP, onLCP, onTTFB].forEach(metricFunc => {
                metricFunc(metric => {
                    this.transport.send({
                        event_type: 'performance',
                        type: 'webVital',
                        name: metric.name,
                        value: metric.value,
                        path: window.location.pathname,
                    })

                    console.log(
                        `🚀 ~ Metrics ~ init ~ {
                        event_type: 'performance',
                        type: 'webVital',
                        name: metric.name,
                        value: metric.value,
                        path: window.location.pathname,
                    }:`,
                        {
                            event_type: 'performance',
                            type: 'webVital',
                            name: metric.name,
                            value: metric.value,
                            path: window.location.pathname,
                        }
                    )
                })
            })
        })
    }
}
