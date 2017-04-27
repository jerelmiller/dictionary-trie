const TERMINATOR = '$'

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

const lowerCase = str => str.toLowerCase()
const split = separator => str => str.split(separator)
const characters = compose(split(''), lowerCase)

export default words => {
  const root = {}

  const insert = word => {
    let currentNode = root
    characters(word).forEach(character => {
      currentNode[character] = currentNode[character] || {}
      currentNode = currentNode[character]
    })
    currentNode[TERMINATOR] = true
  }

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

  words.forEach(insert)

  return {
    includes: word => nodeFor(word)[TERMINATOR] || false,
    search: word => pathsFor(nodeFor(word), word)
  }
}
