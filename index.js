const dictionary = {
	lowercase: 'abcdefghijklmnopqrstuvwxyz'.split(''),
	uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
	number: '0123456789'.split(''),
	symbol: '!@#$%^&*()_+{}?~-='.split('')
};

const config = {
	minLength: 4,
	maxLength: 1000,
	dictionaryKeys: []
};

const isCryptoAvailable = () =>
	typeof crypto !== 'undefined' && crypto.getRandomValues;

const getRandomInt = (max) => {
	if (isCryptoAvailable()) {
		const randomBuffer = new Uint32Array(1);
		crypto.getRandomValues(randomBuffer);
		return randomBuffer[0] % max;
	} else {
		return Math.floor(Math.random() * max);
	}
};

const createDictionaryKeys = (keys) => {
	const defaultKeys = Object.keys(dictionary);
	config.dictionaryKeys = keys
		? keys.filter(key => defaultKeys.includes(key))
		: defaultKeys;
};

const createPass = (passLength) => {
	const allChars = config.dictionaryKeys.flatMap(key => dictionary[key]);
	const pass = [];

	for (const key of config.dictionaryKeys) {
		const chars = dictionary[key];
		pass.push(chars[getRandomInt(chars.length)]);
	}

	while (pass.length < passLength) {
		pass.push(allChars[getRandomInt(allChars.length)]);
	}

	for (let i = pass.length - 1; i > 0; i--) {
		const j = getRandomInt(i + 1);
		[pass[i], pass[j]] = [pass[j], pass[i]];
	}

	return pass;
};

const passGen = (passLength = 12, dictionaryKeys) => {
	createDictionaryKeys(dictionaryKeys);
	config.minLength = config.dictionaryKeys.length;

	if (
		passLength > config.maxLength ||
		passLength < config.minLength ||
		!config.dictionaryKeys.length
	) return undefined;

	if (!isCryptoAvailable()) {
		console.warn('Внимание: используется Math.random() вместо crypto.getRandomValues(). Пароли менее безопасны!');
	}

	return createPass(passLength).join('');
};

export default passGen;
