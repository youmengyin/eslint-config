import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { writeFile } from 'node:fs/promises'
import { combineConfigs } from '../src/utils'
import { configJavaScript, configJSX, configPrettier, configTypeScript } from '../src/configs'
const configs = await combineConfigs({
    plugins: {}
  },
  configJavaScript(),
  configJSX(),
  configTypeScript(),
  configPrettier(),
)

const configNames: string[] = configs.map(i => i.name).filter(Boolean) 
const dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false, // 
})

export async function generateTypes() {
  await writeFile('src/types/typegen.d.ts',
   [
     '// cSpell: disable',
       dts, 
       `// Names of all the configs
       export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
       `,
   ].join('\n'),
 )
}
