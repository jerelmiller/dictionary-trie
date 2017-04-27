import createDictionary from '../src'

describe('createDictionary', () => {
  it('returns searchable dictionary object', () => {
    const dictionary = createDictionary(['test'])

    expect(dictionary).toHaveProperty('includes')
  })
})
