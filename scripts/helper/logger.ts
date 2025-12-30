import chalk, { ChalkInstance } from 'chalk'

type LogLevel = 'log' | 'info' | 'warn' | 'success' | 'error'

export class Logger {
    private static prefixColor = chalk.yellow

    private static levelColorMap: Record<LogLevel, ChalkInstance> = {
        log: chalk.white,
        info: chalk.cyan,
        warn: chalk.yellowBright,
        success: chalk.green,
        error: chalk.red,
    }

    private static print(level: LogLevel, message: string, prefix?: string) {
        const color = this.levelColorMap[level]

        const parts: string[] = []

        if (prefix) {
            parts.push(this.prefixColor(`[${prefix}]`))
        }

        parts.push(color(message))

        console.log(parts.join(' '))
    }

    static log(message: string, prefix?: string) {
        this.print('log', message, prefix)
    }

    static info(message: string, prefix?: string) {
        this.print('info', message, prefix)
    }

    static warn(message: string, prefix?: string) {
        this.print('warn', message, prefix)
    }

    static success(message: string, prefix?: string) {
        this.print('success', message, prefix)
    }

    static error(message: string, prefix?: string) {
        this.print('error', message, prefix)
    }
}
