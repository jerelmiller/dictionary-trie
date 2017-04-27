import createTrie from './trie'

export default words => {
  const trie = createTrie()

  words.forEach(trie.insert)

  return {
    includes: word => trie.includes(word)
  }
}
