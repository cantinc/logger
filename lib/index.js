'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var decorator = require('./decorator/decorator.js');
var Logger = require('./Logger/Logger.js');

const logger = new Logger();
const log = decorator.createDecorator((id, callback) => logger.start(id, callback));

exports.default = logger;
exports.log = log;
