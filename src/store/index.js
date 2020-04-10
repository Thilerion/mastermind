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
		maxTurnsReached: (state, getters) => getters.numGuesses >= state.config.maxGuesses,
		lastGuessEvaluation: state => state.game.evaluations[state.game.evaluations.length - 1],

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
		startGame({ commit }, code) {
			commit('setSecretCode', [...code]);
			commit('resetCurrentGuess');
		},
		resetGame({ commit }) {
			const newGameState = createNewGame();
			commit('setGameState', newGameState);
		},
		createRandomCode({ state, getters, dispatch }) {
			const code = createSecretCode(getters.pinIds, state.config.codeLength);
			dispatch('startGame', code);
		},
		makeMove({ state, getters, commit, dispatch }) {
			// validate current guess
			if (!getters.curGuessIsComplete) {
				console.warn("Invalid guess. Can't make move.");
				return;
			}

			// evaluate guess
			const curGuess = [...state.currentGuess];
			const { correct: black, wrongPlacement: white } = compareCodeToGuess(state.game.code, curGuess);
			const curEval = { black, white };

			// commit guess and evaluation
			commit('addGuessEvaluation', curEval);
			commit('addGuess', curGuess);

			// end turn: check win/loss, reset currentGuess
			dispatch('endTurn');
		},
		endTurn({ state, getters, commit, dispatch }) {
			// check if game has ended
			const { black } = getters.lastGuessEvaluation;
			if (black === state.config.codeLength) {
				dispatch('endGame', true);
			} else if (getters.maxTurnsReached) {
				dispatch('endGame', false);
			}

			// reset current guess, proceed to next turn
			commit('resetCurrentGuess');
		},
		endGame({ commit }, win) {
			if (win) {
				console.log("YOU WIN");
				commit('setGameStatus', 1);
			} else {
				console.log("YOU LOSE");
				commit('setGameStatus', -1);
			}
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
	}
});

export default store;