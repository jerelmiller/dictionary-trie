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
const split = curry((separator, str) => str.split(separator))
const lowerCase = str => str.toLowerCase()
const mutate = curry((key, value, obj) => obj[key] = value)
const keys = Object.keys
const or = curry((defaultVal, val) => val || defaultVal)
const characters = compose(split(''), lowerCase)

const isWordBoundary = compose(or(false), prop(TERMINATOR))
const traverse = reduce(compose(or({}), flip(prop)))

const insert = (tree, word) => {
  compose(
    mutate(TERMINATOR, true),
    reduce((node, letter) => node[letter] = node[letter] || {}, tree),
    characters
  )(word)

  return tree
}

const findMutations = (node, word) => compose(
  flatten,
  map(character =>
    character === TERMINATOR ?
      word :
      findMutations(node[character], word + character)
  ),
  keys
)(node)

const assemble = words => reduce(insert, {}, words)
const traverseWith = tree => compose(traverse(tree), characters)
const build = compose(traverseWith, assemble)

export default words => {
  const traverse = build(words)

  return {
    includes: compose(isWordBoundary, traverse),
    search: word => findMutations(traverse(word), word)
  }
}
