const separateCamelCase = (string: string): string => {
  const result = string.replace(/([A-Z])/g, ' $1')
  return result.charAt(0) + result.slice(1)
}

export default separateCamelCase
