let lastId = 0

export const generateId = (prefix = 'id') => {
  lastId += 1
  return `${prefix}${lastId}`
}
