export const compareCodeToGuess = (code, guess) => {
	let correctPlace = 0;
	let correctColor = 0;

	const foundColors = [];
	const remainingGuessed = [];

	// find all correctly placed pins, and save the rest to check for correct colors
	code.forEach((val, idx) => {
		if (val === guess[idx]) {
			correctPlace += 1;
		} else {
			foundColors.push(val);
			remainingGuessed.push(guess[idx]);
		}
	});

	// use the incorrectly placed pins to check for correct colors
	foundColors.forEach(val => {
		const guessedIdx = remainingGuessed.indexOf(val);
		if (guessedIdx > -1) {
			correctColor += 1;
			remainingGuessed.splice(guessedIdx, 1);
		}
	});

	return {
		correct: correctPlace,
		wrongPlacement: correctColor
	}
}

export const createSecretCode = (pins, length) => {
	return Array(length).fill(null).map(() => pins[Math.floor(Math.random() * pins.length)]);
}