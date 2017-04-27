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

      expect(dictionary.includes('test')).toBe(true)
    })
  })
})
