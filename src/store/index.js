/* eslint-disable no-return-assign */
import Vue from 'vue';
import Vuex from 'vuex';
import { PINS, PIN_TYPES } from '../constants';
import { createSecretCode, compareCodeToGuess } from '../mastermind';

Vue.use(Vuex);

const createNewGame = () => ({
	code: null,
	guesses: [],
	evaluations: []
});

const store = new Vuex.Store({
	state: {
		game: createNewGame(),
		config: {
			codeLength: 4,
			maxGuesses: 10,
			pins: PINS,
			pinTypes: PIN_TYPES
		}
	},

	getters: {
		gameStarted: state => state.game.code != null,
		pinIds: state => Object.values(state.config.pinTypes),
		numGuesses: state => state.game.guesses.length,
	},

	mutations: {
		setGameState: (state, data) => state.game = data,
		setSecretCode: (state, code) => state.game.code = code,
		addGuess: (state, guess) => state.game.guesses.push(guess),
		addGuessEvaluation: (state, evaluation) => state.game.evaluations.push(evaluation),
	},

	actions: {
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
		},
		evaluateGuess({ state, getters, commit }) {
			const lastGuess = state.game.guesses[getters.numGuesses - 1];
			const { correct, wrongPlacement } = compareCodeToGuess(this.state.game.code, lastGuess);
			commit('addGuessEvaluation', { black: correct, white: wrongPlacement });
		}
	}
});

export default store;