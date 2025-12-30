import inquirer from 'inquirer'
import ora from 'ora'
import fs from 'fs-extra'
import archiver from 'archiver'
import * as path from 'path'
import { Logger } from './helper/logger'
import { exec as childProcessExec } from 'child_process'

const executeCommand = (command: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        //
        Logger.log(command, 'Execute command')
        Logger.log(process.cwd(), 'Current directory')

        childProcessExec(command, (error, stdio, stderr) => {
            if (error) {
                Logger.error(`❌ ${error.message}`)
                return reject(error)
            }

            if (stderr) {
                Logger.log(`${stderr}`)
            }

            Logger.log(`${stdio}`)
            return resolve(stdio)
        })
    })
}

type BuildType = 'client' | 'server' | 'all'

const buildAndPackage = async (type: BuildType) => {
    if (type === 'all') {
        await buildAll()
    }

    if (type === 'client') {
        await buildClient()
    }

    if (type === 'server') {
        await buildMonitorServer()
        await buildDsnServer()
    }
}

const buildAll = async () => {
    const spinner = ora('building all\n').start()
    try {
        await executeCommand('pnpm  build')
        spinner.succeed()
    } catch (error) {
        spinner.fail()
    }
}

const buildClient = async () => {
    // const spinner = ora('building client\n').start()
    try {
        // await executeCommand('pnpm build:client')

        const packagePath = path.join(__dirname, 'apps/frontend/monitor/package.json')
        console.log(packagePath)
        const clientPackageJson = await fs.readJson(packagePath)
        let version = clientPackageJson.version
        console.log('version: ', version)
        Logger.info(version)

        // spinner.succeed()
    } catch (error) {
        // spinner.fail()
    }
}

const buildMonitorServer = async () => {
    const spinner = ora('building monitor server\n').start()
    try {
        await executeCommand('pnpm build:server:monitor')
        spinner.succeed()
    } catch (error) {
        spinner.fail()
    }
}

const buildDsnServer = async () => {
    const spinner = ora('building dsn server\n').start()
    try {
        await executeCommand('pnpm build:server:dsn')
        spinner.succeed()
    } catch (error) {
        spinner.fail()
    }
}

const main = async () => {
    const { buildType } = await inquirer.prompt<{
        buildType: BuildType
    }>([
        {
            type: 'list',
            name: 'buildType',
            message: 'What are you going to build?',
            choices: ['all', 'client', 'server'],
        },
    ])

    buildAndPackage(buildType)
}

main().catch(error => {
    Logger.error(error)
    process.exit(1)
})
