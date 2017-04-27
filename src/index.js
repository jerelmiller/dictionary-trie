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

export default words => {
  const root = {}

  const insert = word => {
    let currentNode = root
    characters(word).forEach(character => {
      currentNode[character] = currentNode[character] || {}
      currentNode = currentNode[character]
    })
    currentNode[TERMINATOR] = true
  }

  const nodeFor = word =>
    characters(word)
      .reduce((node, character) => node[character] || {}, root)

  const pathsFor = (node, str = '') =>
    Object
      .keys(node)
      .map(character => {
        if (character === TERMINATOR) {
          return str
        }

        return pathsFor(node[character], str + character)
      })
      .reduce((x, y) => x.concat(y), [])

  words.forEach(insert)

  return {
    includes: compose(or(false), prop(TERMINATOR), nodeFor),
    search: word => pathsFor(nodeFor(word), word)
  }
}
