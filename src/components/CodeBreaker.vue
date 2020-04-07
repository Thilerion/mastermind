<template>
	<div>
		<button @click="$emit('reset')">Herstarten</button>
		<div class="guess-list">
			<GuessRow
				v-for="(guess, idx) in guesses"
				:key="guess.join('') + '-' + idx"
				:guess="guess"
				:row="idx + 1"
				:evaluation="evaluations[idx]"
			/>
		</div>
		<div class="create-guess">
			<CodeInput @finish="evaluateAndAddGuess" />
		</div>
	</div>
</template>

<script>
import GuessRow from './GuessRow';
import CodeInput from './CodeInput';

export default {
	components: {
		GuessRow,
		CodeInput,
	},
	computed: {
		config() {
			return this.$store.state.config;
		},
		code() {
			return this.$store.state.game.code;
		},
		guesses() {
			return this.$store.state.game.guesses;
		},
		evaluations() {
			return this.$store.state.game.evaluations;
		}
	},
	methods: {
		evaluateAndAddGuess(guess) {
			this.$store.dispatch('makeGuess', guess);
			this.$store.dispatch('evaluateGuess');
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