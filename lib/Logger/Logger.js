'use strict';

const readline = typeof require === 'undefined' ? null : require('readline');
const defaultMoveUp = readline
    ? function defaultMoveUp() {
        readline.moveCursor(process.stdout, 0, -1);
    }
    : () => { };
const clear = readline
    ? function clear() {
        readline.clearLine(process.stdout);
    }
    : () => { };
const DISABLE_COLOR = '90';
let count = 0;
const originLog = console.log;
console.log = function log() {
    count++;
    clear();
    originLog.apply(this, arguments);
};
const originWarn = console.warn;
console.warn = function warn() {
    count++;
    originWarn.apply(this, arguments);
};
const originError = console.error;
console.error = function error() {
    count++;
    originError.apply(this, arguments);
};
class Logger {
    constructor() {
        this.deep = [];
    }
    _log(text) {
        console.log(text);
    }
    log(text) {
        const deep = this.deep;
        let prefix = '';
        let i = 0;
        while (deep[i]) {
            prefix += '|';
            i++;
        }
        this._log(`\u001b[32m${prefix}\u001b[39m ${text}`);
    }
    moveUp() {
        return defaultMoveUp();
    }
    callCallback(id, callback) {
        if (callback) {
            let result;
            try {
                result = callback();
            }
            catch (e) {
                this.end(id, e.message);
            }
            if (result instanceof Promise) {
                return result.then(v => {
                    this.end(id);
                    return v;
                }, e => {
                    this.end(id, e.message);
                    return Promise.reject(e);
                });
            }
            else {
                this.end(id);
            }
            return result;
        }
    }
    start(id, callback) {
        const deep = this.deep;
        let prefix = '';
        let i = 0;
        while (deep[i]) {
            prefix += '|';
            i++;
        }
        deep[i] = id;
        this._log(`\u001b[32m${prefix}┌ \u001b[39m${id}`);
        this.lastId = id;
        this.lastCount = count;
        return this.callCallback(id, callback);
    }
    end(id, error) {
        const deep = this.deep;
        let prefix = '';
        let index = deep.length - 1;
        while (index > -1) {
            if (deep[index] === id) {
                deep[index] = '';
                break;
            }
            index--;
        }
        if (index > -1) {
            for (let i = 0; i < index; i++) {
                prefix += deep[i] ? '|' : ' ';
            }
            if (this.lastId === id && this.lastCount === count) {
                this.moveUp();
            }
            else {
                prefix += '└ ';
            }
            if (error) {
                this._log(`\u001b[31m${prefix}✖ \u001b[${DISABLE_COLOR}m${id} \u001b[31m${error}\u001b[39m`);
            }
            else {
                this._log(`\u001b[32m${prefix}✔ \u001b[${DISABLE_COLOR}m${id}\u001b[39m`);
            }
        }
    }
    next(prevId, nextId, error) {
        const deep = this.deep;
        let prefix = '';
        let index = deep.length - 1;
        while (index > -1) {
            if (deep[index] === prevId) {
                deep[index] = nextId;
                break;
            }
            index--;
        }
        if (index > -1) {
            for (let i = 0; i < index; i++) {
                prefix += deep[i] ? '|' : ' ';
            }
        }
        if (error) {
            this._log(`\u001b[31m${prefix}├ ✖ \u001b[${DISABLE_COLOR}m${prevId} \u001b[31m⇝\u001b[39m ${nextId} \u001b[31m${error}\u001b[39m`);
        }
        else {
            this._log(`\u001b[32m${prefix}├ ✔ \u001b[${DISABLE_COLOR}m${prevId} \u001b[32m⇝\u001b[39m ${nextId}`);
        }
    }
}

module.exports = Logger;
