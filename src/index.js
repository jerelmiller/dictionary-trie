import { compose, reduce } from './functional'

const TERMINATOR = '$'

const concat = (a, b) => a.concat(b)
const characters = word => word.toLowerCase().split('')

const insertWith = tree => word => {
  let currentNode = tree
  characters(word).forEach(character => {
    currentNode[character] = currentNode[character] || {}
    currentNode = currentNode[character]
  })
  currentNode[TERMINATOR] = true
}

const findMutations = (node, word) =>
  Object
    .keys(node)
    .map(character =>
      character === TERMINATOR ?
        word :
        findMutations(node[character], word + character)
    )
    .reduce(concat, [])

const traverseWith = tree =>
  compose(
    reduce((node, character) => node[character] || {}, tree),
    characters
  )

export default words => {
  const root = {}
  const traverse = traverseWith(root)

  words.forEach(insertWith(root))

  return {
    includes: word => traverse(word)[TERMINATOR] || false,
    search: word => findMutations(traverse(word), word)
  }
}
