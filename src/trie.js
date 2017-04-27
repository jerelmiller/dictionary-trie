const TERMINATOR = '$'

export default () => {
  const root = {}

  const characters = word => word.toLowerCase().split('')
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

  return {
    insert: word => {
      let currentNode = root
      characters(word).forEach(character => {
        currentNode[character] = currentNode[character] || {}
        currentNode = currentNode[character]
      })
      currentNode[TERMINATOR] = true
    },
    includes: word => !!nodeFor(word)[TERMINATOR],
    search: word => pathsFor(nodeFor(word), word)
  }
}
