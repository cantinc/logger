import LoggerTest, { testLog } from './LoggerTest'

const logger = new LoggerTest()

describe('Logger', () => {
  test('success', () => {
    logger.start('test')

    expect(testLog).toEqual([
      '\u001b[32m┌ \u001b[39mtest',
    ])

    logger.end('test')

    expect(testLog).toEqual([
      '\u001b[32m✔ \u001b[90mtest\u001b[39m',
    ])
  })
  test('error', () => {
    testLog.length = 0

    logger.start('test')

    expect(testLog).toEqual([
      '\u001b[32m┌ \u001b[39mtest',
    ])

    logger.end('test', 'text')

    expect(testLog).toEqual([
      '\u001b[31m✖ \u001b[90mtest \u001b[31mtext\u001b[39m',
    ])
  })
})
