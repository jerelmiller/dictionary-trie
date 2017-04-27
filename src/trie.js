const TERMINATOR = '$'

export default () => {
  const root = {}

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
      const matches = []

      const node = word
        .toLowerCase()
        .split('')
        .reduce((node, character) => node[character] || {}, root)

      const pathsFor = node => {
        return Object
          .keys(node)
          .filter(character => character !== TERMINATOR)
          .map(character => character + pathsFor(node[character]))
      }

      if (node[TERMINATOR]) {
        matches.push(word)
      }

      return matches.concat(pathsFor(node).map(suffix => word + suffix))
    }
  }
}
