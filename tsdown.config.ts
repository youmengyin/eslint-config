import { defineConfig } from 'tsdown'
import { generateTypes } from './scripts/generateType'
import { consola } from 'consola'
import { getColor } from 'consola/utils'
const cyan = getColor('cyan')

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  dts: true,
  // unbundle: true,
  hooks: {
    'build:before': async () => {
      consola.info(`${cyan('TYPES')} start generating types...`)
      generateTypes()
      consola.success(`${cyan('TYPES')} generated success.`)
    }
  }
})
