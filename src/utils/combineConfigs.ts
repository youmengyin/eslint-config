export async function combineConfigs(...configs: any[]) {

  const resolved = await Promise.all(configs)

  return resolved.flat()
}
