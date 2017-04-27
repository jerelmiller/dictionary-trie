const TERMINATOR = '$'

export default () => {
  const root = {}

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
      word.toLowerCase().split('').forEach(character => {
        currentNode[character] = currentNode[character] || {}
        currentNode = currentNode[character]
      })
      currentNode[TERMINATOR] = true
    },
    includes: word => {
      const node = word
        .toLowerCase()
        .split('')
        .reduce((node, character) => node[character] || {}, root)

      return !!node[TERMINATOR]
    },
    search: word => {
      const node = word
        .toLowerCase()
        .split('')
        .reduce((node, character) => node[character] || {}, root)

      return pathsFor(node, word)
    }
  }
}
