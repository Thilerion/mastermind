/* eslint-disable no-return-assign */
import Vue from 'vue';
import Vuex from 'vuex';
import { PINS, PIN_TYPES } from '../constants';
import { createSecretCode, compareCodeToGuess } from '../mastermind';

Vue.use(Vuex);

const createNewGame = () => ({
	code: null,
	guesses: [],
	evaluations: [],
	currentGuess: [],
	status: 0
});

const store = new Vuex.Store({
	state: {
		game: createNewGame(),
		config: {
			codeLength: 4,
			maxGuesses: 10,
			pins: PINS,
			pinTypes: PIN_TYPES
		},
	},

	getters: {
		gameStarted: state => state.game.code != null,
		gameFinished: state => state.game.status !== 0,

		pinIds: state => Object.values(state.config.pinTypes),
		numGuesses: state => state.game.guesses.length,
		currentGuessRow: (state, getters) => getters.gameFinished ? null : getters.numGuesses,
		guessLimitReached: (state, getters) => getters.numGuesses >= state.config.maxGuesses,

		curGuessEmptySpace: state => {
			const emptyIdx = state.game.currentGuess.findIndex(val => val == null);
			return emptyIdx < 0 ? null : emptyIdx;
		},
		curGuessIsFull: state => state.game.currentGuess.length === state.config.codeLength,
		canAddPinToCurGuess: (state, getters) => !getters.curGuessIsFull || getters.curGuessEmptySpace != null,
		curGuessIsComplete: (state, getters) => !getters.canAddPinToCurGuess,
	},

	mutations: {
		setGameState: (state, data) => state.game = data,
		setSecretCode: (state, code) => state.game.code = code,
		setGameStatus: (state, status) => {
			const gameStates = [-1, 0, 1];
			if (gameStates.includes(status)) {
				state.game.status = status;
			} else {
				throw new Error('Unrecognized game state.');
			}
		},
		addGuess: (state, guess) => state.game.guesses.push(guess),
		addGuessEvaluation: (state, evaluation) => state.game.evaluations.push(evaluation),
		setCurrentGuess: (state, curGuess) => state.game.currentGuess = curGuess,
	},

	actions: {
		startGameWithCode({ commit }, code) {
			commit('setSecretCode', [...code]);
		},
		resetGame({ commit }) {
			const newGameState = createNewGame();
			commit('setGameState', newGameState);
		},
		createRandomCode({ state, getters, commit }) {
			const code = createSecretCode(getters.pinIds, state.config.codeLength);
			commit('setSecretCode', code);
		},
		makeGuess({ commit }, guess) {
			commit('addGuess', [...guess]);
			commit('setCurrentGuess', []);
		},
		addPinToCurrentGuess({ state, getters, commit }, pinId) {
			if (!getters.canAddPinToCurGuess) {
				console.warn("Not allowed to add to current guess.");
				return;
			}
			const curGuess = [...state.game.currentGuess];
			if (getters.curGuessEmptySpace != null) {
				console.log('Adding pin to empty space');
				curGuess.splice(getters.curGuessEmptySpace, 1, pinId);
			} else {
				console.log('Adding pin at the end of array');
				curGuess.push(pinId);
			}
			commit('setCurrentGuess', curGuess);
		},
		removePinFromCurrentGuess({ state, commit }, idx) {
			const curGuess = [...state.game.currentGuess];
			if (idx >= curGuess.length) {
				console.warn('Cannot remove pin that has not been placed');
				return;
			} else if (idx + 1 === curGuess.length) {
				curGuess.pop();
			} else {
				curGuess.splice(idx, 1, null);
			}
			commit('setCurrentGuess', curGuess);
		},
		finalizeCurrentGuess({ state, getters, dispatch }) {
			if (!getters.curGuessIsComplete) {
				console.warn('Current guess is incomplete');
				return;
			}
			const curGuess = state.game.currentGuess;
			dispatch('makeGuess', curGuess);
			dispatch('evaluateGuess', curGuess);
		},
		evaluateGuess({ state, getters, commit }, guess) {
			const { correct, wrongPlacement } = compareCodeToGuess(this.state.game.code, guess);
			commit('addGuessEvaluation', { black: correct, white: wrongPlacement });

			if (correct === state.config.codeLength) {
				// game is finished, and won
				console.log('YOU WIN!');
				commit('setGameStatus', 1);
			} else if (getters.guessLimitReached) {
				// game is finished, and lost
				console.log('YOU LOSE!');
				commit('setGameStatus', -1);
			}
		}
	}
});

export default store;