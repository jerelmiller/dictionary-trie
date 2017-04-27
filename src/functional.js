export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)))

export const curry = (f, ...args) =>
  args.length >= f.length ?
    f(...args) :
    (...next) => curry(f, ...args, ...next)

export const map = curry((f, arr) => arr.map(f))
export const reduce = curry((f, initial, arr) => arr.reduce(f, initial))
export const flip = f => (a, b) => f(b, a)
export const prop = curry((key, obj) => obj[key])
