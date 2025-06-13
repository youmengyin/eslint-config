import type { ConfigJavaScriptOptions, ConfigPrettierOptions, ConfigTypeScriptOptions, ConfigVueOptions } from "../configs";
import type { ESLintConfig, TypedConfigItem } from "./eslint";

/**
 * Options for overrides `files`
 */
export interface OptionsFiles {
  files?: ESLintConfig['files']
}
/**
 * Options for overrides `rules`
 */
export interface OptionsOverrides<Rules extends TypedConfigItem['rules'] = TypedConfigItem['rules'],>  {
  overrides?: Rules 
}

export interface OptionsShareable {
  /**
   * @see {@link https://typescript-eslint.io/packages/parser/#extrafileextensions}
   */
  extraFileExtensions?: string[]

  /**
   * Enable typescript support
   * @default false
   */
  typescript?: boolean
}

export interface ConfigOptions {
  /**
   * Shareable options
   */
  shareable?: OptionsShareable

  /**
   * Configs enabled by default
   * @pg
   */

  javascript?: ConfigJavaScriptOptions


  /**
   * Configs bellow can be disabled
   * @pg
   */

  prettier?: boolean | ConfigPrettierOptions
  typescript?: boolean | ConfigTypeScriptOptions
  vue?: boolean | ConfigVueOptions

}
