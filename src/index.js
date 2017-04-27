import { compose, curry, map, prop, reduce } from './functional'

const TERMINATOR = '$'

const concat = (a, b) => a.concat(b)
const flatten = reduce(concat, [])
const characters = word => word.toLowerCase().split('')
const keys = Object.keys
const or = curry((defaultVal, val) => val || defaultVal)

const isWordBoundary = compose(or(false), prop(TERMINATOR))

const insertWith = tree => word => {
  let currentNode = tree
  characters(word).forEach(character => {
    currentNode[character] = currentNode[character] || {}
    currentNode = currentNode[character]
  })
  currentNode[TERMINATOR] = true
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

const traverseWith = tree => compose(
  reduce((node, character) => node[character] || {}, tree),
  characters
)

export default words => {
  const root = {}
  const traverse = traverseWith(root)

  words.forEach(insertWith(root))

  return {
    includes: compose(isWordBoundary, traverse),
    search: word => findMutations(traverse(word), word)
  }
}
