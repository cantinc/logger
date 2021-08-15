<a href="https://github.com/cantinc">
<img align="left" width="90" height="90" alt="CANT.store" src="https://raw.githubusercontent.com/cantinc/logger/main/img/cant.store.png">
</a>

# &nbsp; logger

&nbsp;

[![NPM](https://img.shields.io/npm/v/@cantinc/logger.svg)](https://www.npmjs.com/package/@cantinc/logger)
[![size](https://img.shields.io/bundlephobia/minzip/@cantinc/logger)](https://bundlephobia.com/result?p=@cantinc/logger)
[![downloads](https://img.shields.io/npm/dm/@cantinc/logger.svg)](https://www.npmtrends.com/@cantinc/logger)
[![changelog](https://img.shields.io/badge/Changelog-⋮-brightgreen)](https://changelogs.xyz/@cantinc/logger)
[![license](https://img.shields.io/npm/l/@cantinc/logger)](https://github.com/cantinc/logger/blob/main/LICENSE)

CANT inc. log system

[![stars](https://img.shields.io/github/stars/cantinc/logger?style=social)](https://github.com/cantinc/logger/stargazers)
[![watchers](https://img.shields.io/github/watchers/cantinc/logger?style=social)](https://github.com/cantinc/logger/watchers)

## Install

npm
```shell
npm i @cantinc/logger
```

yarn
```shell
yarn add @cantinc/logger
```

cdn
```html
<script defer src="https://unpkg.com/@cantinc/logger/logger.min.js"></script>
```

## Usage



### Simple example

```typescript
import logger from '@cantinc/logger'

const eventId = 'test'

logger.start(eventId)

// do somethink

logger.end(eventId)
```

## Issues

If you find a bug or have a suggestion, please file an issue on
[GitHub](https://github.com/cantinc/logger/issues).

[![issues](https://img.shields.io/github/issues-raw/cantinc/logger)](https://github.com/cantinc/logger/issues)
