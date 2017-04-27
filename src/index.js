import {
  compose,
  curry,
  flip,
  map,
  prop,
  reduce
} from './functional'

const TERMINATOR = '$'

const concat = (a, b) => a.concat(b)
const flatten = reduce(concat, [])
const characters = word => word.toLowerCase().split('')
const keys = Object.keys
const or = curry((defaultVal, val) => val || defaultVal)
const mutate = curry((key, value, obj) => obj[key] = value)

const isWordBoundary = compose(or(false), prop(TERMINATOR))
const traverse = reduce(compose(or({}), flip(prop)))

const build = words =>
  words.reduce((tree, word) => {
    compose(
      mutate(TERMINATOR, true),
      reduce(
        (node, character) => node[character] = node[character] || {},
        tree
      ),
      characters
    )(word)

    return tree
  }, {})

const findMutations = (node, word) => compose(
  flatten,
  map(character =>
    character === TERMINATOR ?
      word :
      findMutations(node[character], word + character)
  ),
  keys
)(node)

const traverseWith = tree => compose(traverse(tree), characters)

export default words => {
  const tree = build(words)
  const traverse = traverseWith(tree)

  return {
    includes: compose(isWordBoundary, traverse),
    search: word => findMutations(traverse(word), word)
  }
}
