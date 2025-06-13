import { isPackageExists } from 'local-pkg'
import { resolve } from 'node:path'
import process from 'node:process'

type ExistChecker = () => boolean
export const hasPinia: ExistChecker = () => isPackageExists('pinia')
export const hasVitest: ExistChecker = () => isPackageExists('vitest')
export const hasTypeScript: ExistChecker = () => isPackageExists('typescript')

export const hasVue: ExistChecker = () =>
  isPackageExists('vue')
  || isPackageExists('nuxt')
  || isPackageExists('vitepress')
  || isPackageExists('vuepress')
  || isPackageExists('@slidev/cli')
  || isPackageExists('vue', {
    paths: [
      resolve(process.cwd(), 'playground'),
      resolve(process.cwd(), 'docs'),
    ],
  })
