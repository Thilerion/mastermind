export const compareCodeToGuess = (code, guess) => {
	let correctPlace = 0;
	let correctColor = 0;

	let foundColors = [];
	let remainingGuessed = [];

	code.forEach((val, idx) => {
		if (val === guess[idx]) {
			correctPlace += 1;
		} else {
			foundColors.push(val);
			remainingGuessed.push(guess[idx]);
		}
	});

	foundColors.forEach((val, idx) => {
		const guessedIdx = remainingGuessed.indexOf(val);
		if (guessedIdx > -1) {
			correctColor += 1;
			remainingGuessed.splice(guessedIdx, 1);
		}
	})

	return {
		black: correctPlace,
		white: correctColor
	}
}