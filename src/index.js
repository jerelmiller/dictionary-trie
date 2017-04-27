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

const isWordBoundary = compose(Boolean, prop(TERMINATOR))
const traverse = reduce(compose(val => val || {}, flip(prop)))

const insert = (tree, word) => {
  compose(
    node => node[TERMINATOR] = true,
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
  Object.keys
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
