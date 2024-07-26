const dictionary = {
	lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
	uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
	number: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
	symbol: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '?', '~', '-', '=']
}

const config = {
	minLength: 4,
	maxLength: 1000,
	dictionaryKeys: []
}

const createDictionaryKeys = keys => {
	const defaultDictionaryKeys = Object.keys(dictionary)

	if (!keys) {
		config.dictionaryKeys = defaultDictionaryKeys
	} else {
		config.dictionaryKeys = keys.filter(key => defaultDictionaryKeys.includes(key))
	}
}

const createPass = (passLength = 4) => {
	const shuffle = () => Math.random() - 0.5
	const randomInt = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1))

	const shuffledArray =
		config.dictionaryKeys
			.flatMap(key => dictionary[key])
			.sort(shuffle)

	const pass = []

	for (let i = 0; i < passLength; i++) {
		pass.push(shuffledArray[randomInt(0, shuffledArray.length - 1)])
	}

	return pass
}

const isValid = pass => {
	for (let i = 0; i < config.dictionaryKeys.length; i++) {
		const key = config.dictionaryKeys[i]
		const isSome = pass.some(el => dictionary[key].indexOf(el) > -1)
		if (!isSome) return false
	}

	return true
}

const passGen = (passLength, dictionaryKeys) => {
	createDictionaryKeys(dictionaryKeys)
	config.minLength = config.dictionaryKeys.length

	if (
		passLength > config.maxLength ||
		passLength < config.minLength ||
		!config.dictionaryKeys.length
	) return

	let testPassed = false
	let pass

	while (!testPassed) {
		pass = createPass(passLength)
		if (isValid(pass)) testPassed = true
	}

	return pass.join('')
}

module.exports = passGen
