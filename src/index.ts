import Logger from './Logger'
import { createDecorator } from './decorator'

const logger = new Logger()

export const log = createDecorator((id, callback) => logger.start(id, callback))

export default logger
