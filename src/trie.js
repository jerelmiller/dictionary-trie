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

      if (node[TERMINATOR]) {
        matches.push(word)
      }

      return matches
    }
  }
}
