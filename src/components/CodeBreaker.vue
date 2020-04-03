<template>
	<div>
		<button @click="$emit('reset')">Herstarten</button>
		<div class="guess-list">
			<GuessRow
				v-for="(guess, idx) in guesses"
				:key="guess.join('') + '-' + idx"
				:guess="guess"
				:row="idx + 1"
				:evaluation="guessEvaluations[idx]"
			/>
		</div>
		<div class="create-guess">
			<CodeInput @finish="evaluateAndAddGuess" />
		</div>
	</div>
</template>

<script>
import {compareCodeToGuess} from '../mastermind';

import GuessRow from './GuessRow';
import PinInput from './PinInput';
import CodeInput from './CodeInput';

export default {
	components: {
		GuessRow,
		CodeInput,
		PinInput
	},
	props: {
		code: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			maxGuesses: 10,
			guesses: [],
			guessEvaluations: []
		}
	},
	methods: {
		evaluateAndAddGuess(guess) {
			this.guesses.push([...guess]);
			const evaluation = compareCodeToGuess(this.code, guess);
			console.log({guess, evaluation});
			this.guessEvaluations.push(evaluation);
		},
	}
}
</script>

<style scoped>
.guess-list {
	margin-top: 1rem;
}
.create-guess {
	margin-top: 3rem;
}
</style>