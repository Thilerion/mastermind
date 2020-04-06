import { compareCodeToGuess, createSecretCode } from '../../src/mastermind';

describe('compareCodeToGuess', () => {
	it('returns the correct number of white and black', () => {
		const testA = compareCodeToGuess([1, 2, 3, 4], [1, 5, 5, 2]);
		expect(testA).toEqual({
			correct: 1,
			wrongPlacement: 1
		});

		const testB = compareCodeToGuess([0, 0, 1, 1], [1, 0, 2, 0]);
		expect(testB).toEqual({
			correct: 1,
			wrongPlacement: 2
		})
	})

	it('finds a win', () => {
		expect(compareCodeToGuess([1, 2, 3, 4], [1, 2, 3, 4])).toEqual({ correct: 4, wrongPlacement: 0 });
		expect(compareCodeToGuess([0, 0, 0, 0], [0, 0, 0, 0])).toEqual({ correct: 4, wrongPlacement: 0 });
	})

	it('finds all correct colors but wrong placement', () => {
		expect(compareCodeToGuess([1, 2, 5, 5], [5, 5, 1, 2])).toEqual({
			correct: 0,
			wrongPlacement: 4
		});
	})
})

describe('createSecretCode', () => {
	const pinTypes = [0, 1, 2, 3, 4, 5];
	beforeAll(() => {
		jest.spyOn(Math, 'random').mockReturnValue(0.99);
	})
	afterAll(() => {
		jest.restoreAllMocks();
	})
	afterEach(() => {
		jest.clearAllMocks();
	})

	it('returns a code with the correct length', () => {
		expect(createSecretCode(pinTypes, 4)).toHaveLength(4);
		expect(createSecretCode(pinTypes, 6)).toHaveLength(6);
	})

	it('returns a code with random pins', () => {
		let code = createSecretCode(pinTypes, 4);
		expect(Math.random).toHaveBeenCalledTimes(4);
		expect(code).toEqual([5, 5, 5, 5]);

		Math.random.mockReturnValueOnce(0).mockReturnValueOnce(0.17).mockReturnValueOnce(0.34);
		code = createSecretCode(pinTypes, 4);
		expect(code).toEqual([0, 1, 2, 5]);
	})
})