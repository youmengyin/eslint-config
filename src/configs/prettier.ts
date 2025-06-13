import { pluginPrettier } from "../eslint/plugins";
import { ESLintRuleSeverity, TypedConfigItem } from "../types/eslint";
import { OptionsOverrides } from "../types/options";

export const GLOB_SVG: string = '**/*.svg'
export const GLOB_SVELTE: string = '**/*.svelte'
export const GLOB_TOML: string = '**/*.toml'
export const GLOB_ASTRO: string = '**/*.astro'

export interface ConfigPrettierOptions extends OptionsOverrides {
    /**
     * Glob of built-in disabled files
     *
     * @default all svg, toml, svelte and astro files
     * @zh 内置禁用文件的 glob
     */
    disabledFiles?: string[]

    /**
     * rule severity
     * @zh 规则严重程度
     * @default `warn`
     */
    severity?: ESLintRuleSeverity
  
    /**
     * @zh 用户自定义禁用文件
     * @default []
     */
    userDisabledFiles?: string[]
}
export const configPrettier = (options: ConfigPrettierOptions = {}): TypedConfigItem[] => {
  const  {
    disabledFiles = [GLOB_SVG, GLOB_TOML, GLOB_ASTRO, GLOB_SVELTE],
    // User defined disabled files
    userDisabledFiles = [],
  } = options 
  return [
  {
    name: 'whbw/prettier',
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      'vue/array-bracket-newline': 'off',
      'vue/array-bracket-spacing': 'off',
      'vue/array-element-newline': 'off',
      'vue/arrow-spacing': 'off',
      'vue/block-spacing': 'off',
      'vue/block-tag-newline': 'off',
      'vue/brace-style': 'off',
      'vue/comma-dangle': 'off',
      'vue/comma-spacing': 'off',
      'vue/comma-style': 'off',
      'vue/dot-location': 'off',
      'vue/func-call-spacing': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/html-closing-bracket-spacing': 'off',
      'vue/html-end-tags': 'off',
      'vue/html-indent': 'off',
      'vue/html-quotes': 'off',
      'vue/key-spacing': 'off',
      'vue/keyword-spacing': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/multiline-ternary': 'off',
      'vue/mustache-interpolation-spacing': 'off',
      'vue/no-extra-parens': 'off',
      'vue/no-multi-spaces': 'off',
      'vue/no-spaces-around-equal-signs-in-attribute': 'off',
      'vue/object-curly-newline': 'off',
      'vue/object-curly-spacing': 'off',
      'vue/object-property-newline': 'off',
      'vue/operator-linebreak': 'off',
      'vue/quote-props': 'off',
      'vue/script-indent': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/space-in-parens': 'off',
      'vue/space-infix-ops': 'off',
      'vue/space-unary-ops': 'off',
      'vue/template-curly-spacing': 'off',
      ...(pluginPrettier.configs!.recommended as TypedConfigItem).rules,
      'prettier/prettier': options.severity || 'warn',
      ...options.overrides 
    },
  },
  /**
   * 
   * @zh 目前 prettier 不支持的语言
   */
  {
    name: 'whbw/prettier/disabled',
    files: [...disabledFiles, ...userDisabledFiles],
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'off',
    },
  },
]
}
