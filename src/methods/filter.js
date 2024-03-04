export function date (time) {
  if (!time) return ''
  return new Date(time * 1000).toLocaleDateString()
}
