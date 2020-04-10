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

		currentGuess: null
	},

	getters: {
		gameStarted: state => state.game.code != null,
		gameFinished: state => state.game.status !== 0,
		blockGameInput: (state, getters) => !getters.gameStarted || getters.gameFinished,

		pinIds: state => Object.values(state.config.pinTypes),
		numGuesses: state => state.game.guesses.length,
		guessLimitReached: (state, getters) => getters.numGuesses >= state.config.maxGuesses,

		currentGuessRow: (state, getters) => getters.gameFinished ? null : getters.numGuesses,
		curGuessIsComplete: state => state.currentGuess.length === state.config.codeLength && state.currentGuess.findIndex(val => val === null) === -1,
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

		resetCurrentGuess: (state) => state.currentGuess = Array(state.config.codeLength).fill(null),
		setCurrentGuess: (state, curGuess) => state.currentGuess = curGuess,
	},

	actions: {
		startGameWithCode({ commit }, code) {
			commit('setSecretCode', [...code]);
			commit('resetCurrentGuess');
		},
		resetGame({ commit }) {
			const newGameState = createNewGame();
			commit('setGameState', newGameState);
		},
		createRandomCode({ state, getters, commit }) {
			const code = createSecretCode(getters.pinIds, state.config.codeLength);
			commit('setSecretCode', code);
			commit('resetCurrentGuess');
		},
		addPinToCurrentGuess({ state, getters, commit }, { pin, idx }) {
			if (getters.blockGameInput) {
				console.warn("Game not running, can't add pin.");
				return;
			}
			const curGuess = [...state.currentGuess];
			if (idx == null) {
				// add to first empty spot
				const firstEmpty = curGuess.findIndex(val => val === null);
				if (firstEmpty < 0) {
					console.warn('No empty spot to place pin.');
					return;
				} else {
					curGuess.splice(firstEmpty, 1, pin);
				}
			} else {
				curGuess.splice(idx, 1, pin);
			}
			commit('setCurrentGuess', curGuess);
		},
		removePinFromCurrentGuess({ state, commit }, idx) {
			const curGuess = [...state.currentGuess];
			curGuess.splice(idx, 1, null);
			commit('setCurrentGuess', curGuess);
		},
		finalizeCurrentGuess({ state, getters, commit, dispatch }) {
			if (!getters.curGuessIsComplete) {
				console.warn('Current guess is incomplete');
				return;
			}
			const curGuess = state.currentGuess;

			const { correct: black, wrongPlacement: white } = compareCodeToGuess(state.game.code, curGuess);

			commit('addGuessEvaluation', { black, white });
			commit('addGuess', [...curGuess]);
			commit('resetCurrentGuess');

			dispatch('evaluateGameStatus', { black });
		},
		evaluateGameStatus({ state, getters, commit }, { black }) {
			if (black === state.config.codeLength) {
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