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
  })
})
