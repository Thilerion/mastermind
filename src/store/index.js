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
	currentGuess: []
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
		pinIds: state => Object.values(state.config.pinTypes),
		numGuesses: state => state.game.guesses.length,

		curGuessEmptySpace: state => {
			const emptyIdx = state.game.currentGuess.findIndex(val => val == null);
			return emptyIdx < 0 ? null : emptyIdx;
		},
		curGuessIsFull: state => state.game.currentGuess.length === state.config.codeLength,
		canAddPinToCurGuess: (state, getters) => !getters.curGuessIsFull || getters.curGuessEmptySpace,
		curGuessIsComplete: (state, getters) => !getters.canAddPinToCurGuess,
	},

	mutations: {
		setGameState: (state, data) => state.game = data,
		setSecretCode: (state, code) => state.game.code = code,
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
			if (getters.curGuessEmptySpace) {
				console.log('Adding pin to empty space');
				curGuess.splice(getters.curGuessEmptySpace, 1, pinId);
			} else {
				console.log('Adding pin at the end of array');
				curGuess.push(pinId);
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
		evaluateGuess({ commit }, guess) {
			const { correct, wrongPlacement } = compareCodeToGuess(this.state.game.code, guess);
			commit('addGuessEvaluation', { black: correct, white: wrongPlacement });
		}
	}
});

export default store;