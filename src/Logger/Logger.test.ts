import Logger from '.'

const log = []

class LoggerTest extends Logger {
  log () {
    log.push([...arguments])
  }
}

const logger = new LoggerTest()

describe('Logger', () => {
  it('works', () => {
    logger.start('test')

    expect(log.length).toBe(1)

    logger.end('test')

    expect(log.length).toBe(2)
  })
})
