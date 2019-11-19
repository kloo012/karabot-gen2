let lastId = 0

export const generateId = (prefix = 'id') => {
  lastId += 1
  return `${prefix}${lastId}`
}

export const setTimer = (cb, time) => {
  return setTimeout(cb, time)
}

export const clearTimer = (timer) => {
  clearTimeout(timer)
}
