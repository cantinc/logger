import Logger from './Logger'

export const testLog = []

export default class LoggerTest extends Logger {
  _log (text) {
    testLog.push(text)
  }

  protected moveUp () {
    testLog.length--
  }
}
