const dictionary = {
	lettersLowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
	lettersUppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
	numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
	symbols: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '?', '~', '-', '=']
}

const createPass = (passLength = 4) => {
	const shuffle = () => Math.random() - 0.5
	const randomInt = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1))

	const shuffledArray = [
		...dictionary.lettersLowercase,
		...dictionary.lettersUppercase,
		...dictionary.numbers,
		...dictionary.symbols
	].sort(shuffle)

	const pass = []

	for (let i = 0; i < passLength; i++) {
		pass.push(shuffledArray[randomInt(0, shuffledArray.length - 1)])
	}

	return pass
}

const isValid = pass => {
	for (const key in dictionary) {
		const isSome = pass.some(el => dictionary[key].indexOf(el) > -1)
		if (!isSome) return false
	}

	return true
}

const passGen = passLength => {
	if (passLength > 1000) return
	if (passLength < 4) return

	let testPassed = false
	let pass

	while (!testPassed) {
		pass = createPass(passLength)
		if (isValid(pass)) testPassed = true
	}

	return pass.join('')
}

module.exports = passGen

