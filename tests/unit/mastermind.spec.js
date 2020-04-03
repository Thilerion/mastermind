import {compareCodeToGuess} from '../../src/mastermind';

describe('compareCodeToGuess', () => {
	it('returns the correct number of white and black', () => {
		const testA = compareCodeToGuess([1, 2, 3, 4], [1, 5, 5, 2]);
		expect(testA).toEqual({
			black: 1,
			white: 1
		});

		const testB = compareCodeToGuess([0, 0, 1, 1], [1, 0, 2, 0]);
		expect(testB).toEqual({
			black: 1,
			white: 2
		})
	})

	it('finds a win', () => {
		expect(compareCodeToGuess([1, 2, 3, 4], [1, 2, 3, 4])).toEqual({black: 4, white: 0});
		expect(compareCodeToGuess([0, 0, 0, 0], [0, 0, 0, 0])).toEqual({black: 4, white: 0});
	})

	it('finds all correct colors but wrong placement', () => {
		expect(compareCodeToGuess([1, 2, 5, 5], [5, 5, 1, 2])).toEqual({
			black: 0,
			white: 4
		})
	})
})