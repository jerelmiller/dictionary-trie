import createDictionary from '../src'

describe('createDictionary', () => {
  it('returns searchable dictionary object', () => {
    const dictionary = createDictionary([])

    expect(dictionary).toHaveProperty('includes')
  })

  describe('#includes', () => {
    it('returns true when word has been added', () => {
      const dictionary = createDictionary(['test'])

      expect(dictionary.includes('test')).toBe(true)
    })

    it('returns false when word has not been added', () => {
      const dictionary = createDictionary(['blah'])

      expect(dictionary.includes('test')).toBe(false)
    })

    it('returns false for partial word matches', () => {
      const dictionary = createDictionary(['rate'])

      expect(dictionary.includes('rat')).toBe(false)
    })

    it('returns true for common roots', () => {
      const dictionary = createDictionary(['rat', 'rate', 'rates'])

      expect(dictionary.includes('rat')).toBe(true)
      expect(dictionary.includes('rate')).toBe(true)
      expect(dictionary.includes('rates')).toBe(true)
    })

    it('handles many dictionary words', () => {
      const dictionary = createDictionary([
        'rat', 'rate', 'music', 'musician', 'flower', 'flow', 'data', 'water',
        'wait', 'rain', 'rainer', 'rained', 'raining', 'couch', 'room'
      ])

      expect(dictionary.includes('rat')).toBe(true)
      expect(dictionary.includes('music')).toBe(true)
      expect(dictionary.includes('flower')).toBe(true)
      expect(dictionary.includes('balloon')).toBe(false)
      expect(dictionary.includes('rain')).toBe(true)
    })
  })

  describe('#search', () => {
    it('returns exact matches', () => {
      const dictionary = createDictionary(['watch'])

      expect(dictionary.search('watch')).toEqual(['watch'])
    })

    it('returns partial matches', () => {
      const dictionary = createDictionary(['watched'])

      expect(dictionary.search('watch')).toEqual(['watched'])
    })

    it('returns no matches when when dictionary does not contain word', () => {
      const dictionary = createDictionary(['seal'])

      expect(dictionary.search('couch')).toEqual([])
    })

    it('handles partial and exact matches', () => {
      const dictionary = createDictionary([
        'watch', 'watched', 'watching', 'watches'
      ])

      expect(dictionary.search('watch')).toEqual([
        'watch', 'watched', 'watching', 'watches'
      ])
    })

    it('handles random cases', () => {
      const dictionary = createDictionary([
        'watch', 'watched', 'watching', 'watches', 'watcher',
        'flower', 'flow', 'flowed', 'cookie', 'cook', 'can', 'cotton'
      ])

      expect(dictionary.search('watche')).toEqual([
        'watched', 'watches', 'watcher'
      ])
      expect(dictionary.search('flow')).toEqual([
        'flow', 'flowed', 'flower'
      ])
      expect(dictionary.search('cook')).toEqual(['cookie', 'cook'])
      expect(dictionary.search('cotton')).toEqual(['cotton'])
      expect(dictionary.search('blah')).toEqual([])
    })
  })
})
