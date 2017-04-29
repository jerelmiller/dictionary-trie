# Dictionary Trie

Create and efficiently search a dictionary of words.

## Installation

npm:
```
npm install --save dictionary-trie
```

yarn:
```
yarn add dictionary-trie
```

## Usage

Create your dictionary by importing the `createDictionary` function.
```javascript
import createDictionary from 'dictionary-trie'

const words = [
  'rat', 'rate', 'music', 'musician', 'flower', 'flow', 'data', 'water',
  'wait', 'rain', 'rainer', 'rained', 'raining', 'couch', 'room'
]

const dictionary = createDictionary(words)
```

You can use this dictionary to determine whether a word is included. Note this
is not a partial match.
```javascript
dictionary.includes('music') // => true
dictionary.includes('rat') // => true
dictionary.includes('rats') // => false
```

If you would like to partially match and return possiblity, use the `search`
function.
```javascript
dictionary.search('ra') // => ['rat', 'rate', 'rain', 'rainer', 'rained', 'raining']
dictionary.search('rai') // => ['rain', 'rainer', 'rained', 'raining']
dictionary.search('rain') // => ['rain', 'rainer', 'rained', 'raining']
dictionary.search('raine') // => ['rainer', 'rained']
dictionary.search('rained') // => ['rained']
dictionary.search('couches') // => []
```

## License

MIT
