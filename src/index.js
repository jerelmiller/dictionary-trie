import createTrie from './trie'

export default words => {
  const trie = createTrie()

  words.forEach(trie.insert)

  return {
    includes: trie.includes,
    search: trie.search
  }
}
