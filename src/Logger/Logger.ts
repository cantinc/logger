export type Callback = () => any

export default class Logger {
  private readonly deep: string[] = []

  log (...ars: any[]): any
  log () {
    return console.log.apply(console, arguments)
  }

  private callCallback (id: string, callback?: Callback) {
    if (callback) {
      let result
      try {
        result = callback()
      } catch (e) {
        this.end(id, e.message)
      }
      if (result instanceof Promise) {
        return result.then(v => {
          this.end(id)
          return v
        }, e => {
          this.end(id, e.message)
          return Promise.reject(e)
        })
      } else {
        this.end(id)
      }

      return result
    }
  }

  start (id: string, callback?: Callback) {
    const deep = this.deep
    let prefix = ''
    let i = 0

    while (deep[i]) {
      prefix += '|'
      i++
    }

    deep[i] = id

    this.log(`\u001b[32m${prefix}┌ \u001b[39m${id}`)

    return this.callCallback(id, callback)
  }

  end (id: string, error?: string) {
    const deep = this.deep
    let prefix = ''

    let index = deep.length - 1

    while (index > -1) {
      if (deep[index] === id) {
        deep[index] = ''
        break
      }
      index--
    }

    if (index > -1) {
      for (let i = 0; i < index; i++) {
        prefix += deep[i] ? '|' : ' '
      }

      if (error) {
        this.log(`\u001b[31m${prefix}└ ✖ ${id}\u001b[39m \u001b[31m${error}\u001b[39m`)
      } else {
        this.log(`\u001b[32m${prefix}└ ✔ ${id}\u001b[39m`)
      }
    }
  }

  next (prevId: string, nextId: string, error?: string) {
    const deep = this.deep
    let prefix = ''

    let index = deep.length - 1

    while (index > -1) {
      if (deep[index] === prevId) {
        deep[index] = nextId
        break
      }
      index--
    }

    if (index > -1) {
      for (let i = 0; i < index; i++) {
        prefix += deep[i] ? '|' : ' '
      }
    }

    if (error) {
      this.log(`\u001b[31m${prefix}├ ✖ ${prevId} ⇝\u001b[39m ${nextId} \u001b[31m${error}\u001b[39m`)
    } else {
      this.log(`\u001b[32m${prefix}├ ✔ ${prevId} ⇝\u001b[39m ${nextId}`)
    }
  }
}
