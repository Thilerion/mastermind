import Vue from 'vue';
import Vuex from 'vuex';
import { PINS } from '../constants';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		game: {
			code: null,
			guesses: [],
			evaluations: []
		},
		config: {
			codeLength: 4,
			maxGuesses: 10,
			pins: PINS
		}
	},

	getters: {

	},

	mutations: {

	},

	actions: {

	}
});

export default store;