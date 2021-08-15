import chalk from 'chalk'

export default class Logger {
  private deep: string[] = []

  log (...ars: any[]): any
  log () {
    return console.log.apply(console, arguments)
  }

  start (id: string, callback?: () => any) {
    let prefix = ''
    let i = 0

    while (this.deep[i]) {
      prefix += '|'
      i++
    }

    this.deep[i] = id

    this.log(chalk.green(prefix + '┌ '), id)

    if (callback) {
      let result
      try {
        result = callback()
      } catch (e) {
        this.end(id, e)
      }
      if (result instanceof Promise) {
        return result.then(v => {
          this.end(id)
          return v
        }, e => {
          this.end(id, e)
          return Promise.reject(e)
        })
      } else {
        this.end(id)
      }

      return result
    }
  }

  end (id: string, error?: Error) {
    let prefix = ''
    let i = 0

    for (const value of this.deep) {
      if (value === id) {
        this.deep[i] = undefined
        break
      }

      prefix += value ? '|' : ' '
      i++
    }

    this.log(`${error ? chalk.red(prefix + '└ error ') : chalk.green(prefix + '└ success ')}`, id)
  }
}
