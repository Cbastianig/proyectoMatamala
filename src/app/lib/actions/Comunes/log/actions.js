'use server'
const pino = require('pino')
export default async function log_error(error, error_stack) {

    try {
        const logger = pino(pino.destination('./src/app/lib/actions/Comunes/log/log.txt'))
        logger.error({ err: error, stack: error_stack })
    } catch (error) {
        console.error(error)
    }

}