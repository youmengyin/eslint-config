import { ConfigOptions, ResolvedOptions, TypedConfigItem } from "../types"
import { RuleOptions } from "../types/typegen"
import { resolveSubOptions } from "./resolveSubOptions"

export function getOverrides<K extends keyof ConfigOptions>(options: ConfigOptions, key: K ):  Partial<TypedConfigItem['rules'] & RuleOptions> {

  const subOptions: Partial<ResolvedOptions<ConfigOptions[K]>> = resolveSubOptions(options, key)

  return ('overrides' in subOptions && subOptions.overrides)
    ? subOptions.overrides 
    : {}
}
