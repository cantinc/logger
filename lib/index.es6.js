import { createDecorator } from './decorator/decorator.es6.js';
import Logger from './Logger/Logger.es6.js';

const logger = new Logger();
const log = createDecorator((id, callback) => logger.start(id, callback));

export default logger;
export { log };
