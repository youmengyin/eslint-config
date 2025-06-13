import type { Linter, } from "eslint"
import type{ RuleOptions } from "./typegen"
import type { Pretty } from "./utils"
import type { ConfigWithExtends } from "typescript-eslint"

export type ESLintRulesRecord = Linter.RulesRecord
export type ESLintParser = Linter.Parser
export type ESLintParserOptions = Linter.ParserOptions
export type ESLintProcessor = Linter.Processor

export type ESLintRuleSeverity = 'error' | 'warn'

export type ESLintConfig<Rules extends ESLintRulesRecord = ESLintRulesRecord> = Linter.Config<Rules>

export type TSESLintParserOptions = Pretty<Required<Required<ConfigWithExtends>['languageOptions']>['parserOptions']>
// 重写一下Linter.Config，把plugins的类型改成Record<string, any>，大部分plugins没有类型定义
export type TypedConfigItem = Omit<Linter.Config<ESLintRulesRecord & RuleOptions>, 'plugins'> & {
  plugins?: Record<string, any>
}
