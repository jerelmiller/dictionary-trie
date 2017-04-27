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
      if (!word) {
        return false
      } else if (Object.keys(root).length === 0) {
        return false
      }

      let currentNode = root

      return word
        .toLowerCase()
        .split('')
        .reduce((isContained, character) => {
          if (!isContained) {
            return false
          }

          const contained = isContained &&
            Object.keys(currentNode).indexOf(character) !== -1
          currentNode = currentNode[character] || {}

          return contained
        }, true)
    }
  }
}
