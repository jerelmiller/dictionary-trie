const TERMINATOR = '$'

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
const curry = (f, ...args) =>
  args.length >= f.length ?
    f(...args) :
    (...next) => curry(f, ...args, ...next)

const lowerCase = str => str.toLowerCase()
const split = curry((separator, str) => str.split(separator))
const characters = compose(split(''), lowerCase)
const prop = curry((property, obj) => obj[property])
const or = curry((defaultVal, val) => val || defaultVal)
const concat = (a, b) => a.concat(b)
const keys = Object.keys
const map = curry((f, arr) => arr.map(f))
const reduce = curry((f, initial, arr) => arr.reduce(f, initial))
const flip = f => (a, b, ...args) => f(b, a, ...args)
const dig = flip(prop)
const flatten = reduce(concat, [])
const set = curry((key, val, obj) => obj[key] = val)

export default words => {
  const root = {}

  const insert = compose(
    set(TERMINATOR, true),
    reduce((node, character) => node[character] = node[character] || {}, root),
    characters
  )

  const nodeFor = compose(
    reduce(compose(or({}), dig), root),
    characters
  )

  const pathsFor = (node, str = '') => {
    return compose(
      flatten,
      map(character => {
        if (character === TERMINATOR) {
          return str
        }

        return pathsFor(node[character], str + character)
      }),
      keys
    )(node)
  }

  words.forEach(insert)

  return {
    includes: compose(or(false), prop(TERMINATOR), nodeFor),
    search: word => pathsFor(nodeFor(word), word)
  }
}
