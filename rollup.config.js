import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'
import glob from 'glob'

const exclude = [
  'src/**/*.test.ts',
  'src/**/*.test.tsx',
]

const template = {
  input: glob.sync('{src/index.ts,src/**/index.ts}'),
  external: Object.keys(pkg.dependencies || {}),
  plugins: [
    typescript({
      tsconfigOverride: {exclude},
    })
  ]
}

export default [{
  ...template,
  output: {
    dir: 'lib',
    entryFileNames: '[name]' + pkg.main.replace('index', ''),
    format: 'cjs',
    preserveModules: true
  }
}, {
  ...template,
  output: {
    dir: 'lib',
    entryFileNames: '[name]' + pkg.module.replace('index', ''),
    format: 'es',
    preserveModules: true
  }
}, {
  input: 'src/index.min.ts',
  output: {
    file: 'lib/logger.min.js',
    format: 'iife',
    name: 'logger',
    plugins: [terser()],
  },
  plugins: [
    typescript({
      tsconfigOverride: {exclude},
      rollupCommonJSResolveHack: false,
      clean: true,
    })
  ]
}]
