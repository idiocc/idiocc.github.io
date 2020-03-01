export default function makeClassGetter(renameMap) {
  if (!renameMap) return s => s
  const fn = (strings) => {
    const s = strings.raw[0]
    const keys = s.split(/\s+/)
    return keys.map((k) => {
      const val = renameMap[k]
      if (!val) {
        console.error('Key %s is not present in the CSS map.', k)
        return k
      }
      return val
    }).join(' ')
  }
  Object.keys(renameMap).forEach((key) => {
    fn[`$${key}`] = renameMap[key]
  })
  return fn
}