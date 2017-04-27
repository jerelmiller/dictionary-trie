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
const set = curry((key, val, obj) => obj[key] = val)

const flatten = reduce(concat, [])
const traverse = reduce(compose(or({}), flip(prop)))
const isWordBoundary = compose(or(false), prop(TERMINATOR))
const markBoundary = set(TERMINATOR, true)

const insertWith = root =>
  compose(
    markBoundary,
    reduce((node, character) => node[character] = node[character] || {}, root),
    characters
  )

const traverseWith = root => compose(traverse(root), characters)

export default words => {
  const root = {}

  const insert = insertWith(root)
  const walk = traverseWith(root)

  const findMutations = (node, str) =>
    compose(
      flatten,
      map(character =>
        character === TERMINATOR ?
          str :
          findMutations(node[character], concat(str, character))
      ),
      keys
    )(node)

  words.forEach(insert)

  return {
    includes: compose(isWordBoundary, walk),
    search: word => findMutations(walk(word), word)
  }
}
