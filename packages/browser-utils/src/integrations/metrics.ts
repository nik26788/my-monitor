import { onCLS, onFCP, onINP, onLCP, onTTFB } from '../metrics'

export class Metrics {
    init() {
        window.addEventListener('load', () => {
            ;[onCLS, onFCP, onINP, onLCP, onTTFB].forEach(metricFunc => {
                metricFunc(metric => {
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
