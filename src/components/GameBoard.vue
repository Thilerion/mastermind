<template>
	<ul class="board">
		<BoardRow
			v-for="(rowNum, idx) in maxGuesses"
			:key="idx"
			:guess="guessesWithCurrentGuess[idx]"
			:evaluation="evaluations[idx]"
			:row="rowNum"
			:is-current-guess="idx === highlightedRow"
		/>
	</ul>
</template>

<script>
import BoardRow from './BoardRow';

export default {
	components: {
		BoardRow,
	},
	computed: {
		maxGuesses() {
			return this.$store.state.config.maxGuesses;
		},
		guesses() {
			return this.$store.state.game.guesses;
		},
		evaluations() {
			return this.$store.state.game.evaluations;
		},
		numGuesses() {
			return this.$store.getters.numGuesses;
		},
		highlightedRow() {
			return this.$store.getters.currentGuessRow;
		},
		currentGuess() {
			return this.$store.state.currentGuess;
		},

		guessesWithCurrentGuess() {
			const guesses = [...this.guesses, this.currentGuess];
			// guesses.splice(this.numGuesses, 1, this.currentGuess);
			return guesses;
		}
	}
};
</script>

<style scoped>
.board {
	padding: 1rem 0;
}
</style>