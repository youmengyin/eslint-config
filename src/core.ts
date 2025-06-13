import { FlatConfigComposer } from 'eslint-flat-config-utils'
import { ESLintConfig, TypedConfigItem } from './types/eslint'
import { ConfigNames } from './types/typegen'
import { hasTypeScript, hasVue, resolveSubOptions } from './utils'
import { configJavaScript, configJSX, configPrettier, configTypeScript, configVue } from './configs'
import { getOverrides } from './utils/getOverrides'
import type { ConfigOptions } from './types'
export function defineConfigWithEslint(options: ConfigOptions = {}, ...userConfigs: Awaited<TypedConfigItem | TypedConfigItem[] | ESLintConfig[]>[]):FlatConfigComposer<TypedConfigItem, ConfigNames> {

  const {
    shareable = {},
    /**
     * @zh  根据依赖判断
     */
    vue: enableVue = hasVue(),
    typescript: enableTypeScript = hasTypeScript(),
    /**
     * @zh 默认启用
     */
    prettier: enablePrettier = true,
  } = options

  const { extraFileExtensions = [] } = shareable

  if(enableVue) {
    extraFileExtensions.push('.vue')
  }
  const configs: Awaited<TypedConfigItem |  TypedConfigItem[]>[] = []
  configs.push(
    configJavaScript(),
    configJSX()
  )

  if (enableTypeScript) {
    configs.push(
      configTypeScript({
        ...resolveSubOptions(options, 'typescript'),
        overrides: getOverrides(options, 'typescript'),
        extraFileExtensions,
      }),
    )
  }
  if (enableVue) {
    configs.push(
      configVue({
        ...resolveSubOptions(options, 'vue'),
        typescript: !!enableTypeScript,
        overrides: getOverrides(options, 'vue'),
        extraFileExtensions,
      }),
    )
  }
  const prettierConfigs: TypedConfigItem[] = enablePrettier
  ? configPrettier({
      ...resolveSubOptions(options, 'prettier'),
      overrides: getOverrides(options, 'prettier'),
    })
  : []

  const composer = new FlatConfigComposer<TypedConfigItem, ConfigNames>(
    ...configs,
    ...userConfigs,
    
    ...prettierConfigs,
  )
  return composer
}
