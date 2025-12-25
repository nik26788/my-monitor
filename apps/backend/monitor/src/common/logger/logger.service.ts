import 'winston-daily-rotate-file'

import { Injectable } from '@nestjs/common'
import { createLogger, format, Logger as WinstonLogger, transports } from 'winston'

@Injectable()
export class LoggerService {
    private logger: WinstonLogger

    constructor() {
        this.logger = createLogger({
            level: 'info', // Default log level
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // setup timestamp format
                format.printf(({ timestamp, level, message, ...metadata }) => {
                    //  make sure that timestamp at the start of the log line,and handle metadata（like params）
                    let logMessage = `${timestamp} [${level}] : ${message}`

                    // if there is metadata（additional object）,format it to JSON
                    if (Object.keys(metadata).length > 0) {
                        if (metadata.message !== 'message') {
                            logMessage += ` | ${JSON.stringify(metadata, null, 2)}`
                        }
                    }
                    return logMessage
                })
            ),
            transports: [
                // output on the console
                new transports.Console({
                    format: format.combine(
                        format.colorize(), // color
                        format.simple() // simple format
                    ),
                }),
                // using daily-rotate-file to generate logs with name from date
                new transports.DailyRotateFile({
                    filename: 'logs/%DATE%.log', // file name include date
                    datePattern: 'YYYY-MM-DD', // setup date format
                    maxFiles: '7d', //  keep logs for 7 days
                    level: 'info', // set log level to info
                    format: format.combine(
                        format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }),
                        format.printf(info => {
                            const paramsInfo = JSON.parse(JSON.stringify(info))
                            // avoid message field appear as a key in the log
                            delete paramsInfo.message
                            return `${info.timestamp} [${info.level}] : ${info.message} ${
                                Object.keys(info).length ? JSON.stringify(paramsInfo, null, 2) : ''
                            }`
                        })
                    ),
                }),
            ],
        })
    }

    log(message: string, params: object = {}) {
        if (typeof params === 'object' && Object.keys(params).length > 0) {
            // if params exist,output the log via customize method
            const logMessage = {
                message,
                ...params,
                level: 'info', // set log level to info
            }
            this.logger.info(logMessage)
        } else {
            this.logger.info(message)
        }
    }

    error(message: string, params: object = {}, trace: string = '') {
        if (typeof params === 'object' && Object.keys(params).length > 0) {
            // if params exist,output the log via customize method
            const logMessage = {
                message,
                ...params,
                level: 'error', // set log level to error
                trace, // if there are errors from like heap, stack, output them as log
            }
            this.logger.error(logMessage)
        } else {
            this.logger.error(message)
        }
    }

    warn(message: string, params: object = {}) {
        if (typeof params === 'object' && Object.keys(params).length > 0) {
            // if params exist,output the log via customize method
            const logMessage = {
                message,
                ...params,
                level: 'warn', // set log level to warn
            }
            this.logger.warn(logMessage)
        } else {
            this.logger.warn(message)
        }
    }

    debug(message: string, params: object = {}) {
        if (typeof params === 'object' && Object.keys(params).length > 0) {
            // if params exist,output the log via customize method
            const logMessage = {
                message,
                ...params,
                level: 'debug', // set log level to debug
            }
            this.logger.debug(logMessage)
        } else {
            this.logger.debug(message)
        }
    }

    info(message: string, params: object = {}) {
        if (typeof params === 'object' && Object.keys(params).length > 0) {
            // if params exist, output the log via customize method
            const logMessage = {
                message,
                ...params,
                level: 'info', // set log level to info
            }
            this.logger.info(logMessage)
        } else {
            this.logger.info(message)
        }
    }
}
