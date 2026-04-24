type DictionaryKey = 'lowercase' | 'uppercase' | 'number' | 'symbol'

declare function passGen(passLength?: number, dictionaryKeys?: DictionaryKey[]): string | undefined

export default passGen