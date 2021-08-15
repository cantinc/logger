import Logger from '.'

let log = []

class LoggerTest extends Logger {
  log (text) {
    log.push(text)
  }
}

const logger = new LoggerTest()

describe('Logger', () => {
  test('success', () => {
    logger.start('test')

    expect(log.length).toBe(1)

    logger.end('test')

    expect(log.length).toBe(2)

    expect(log).toEqual([
      '\u001b[32m┌ \u001b[39mtest',
      '\u001b[32m└ ✔ \u001b[90mtest\u001b[39m',
    ])
  })
  test('error', () => {
    log = []
    logger.start('test')

    expect(log.length).toBe(1)

    logger.end('test', 'text')

    expect(log.length).toBe(2)

    expect(log).toEqual([
      '\u001b[32m┌ \u001b[39mtest',
      '\u001b[31m└ ✖ \u001b[90mtest \u001b[31mtext\u001b[39m',
    ])
  })
})
