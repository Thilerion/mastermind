<template>
	<div class="pin-inputs">
		<button
			v-for="pinId in availPins"
			:key="pinId"
			class="pin-input-btn"
			:style="{ '--pin-color': pins[pinId].color }"
			:disabled="blockGameInput"
			@click="addPin(pinId)"
		></button>
		<button
			class="check-btn"
			@click="checkCurrentGuess"
			:disabled="!canCheckCurrentGuess"
		>Check</button>
	</div>
</template>

<script>
export default {
	computed: {
		pinIds() {
			return this.$store.getters.pinIds;
		},
		availPins() {
			// TODO: game config that disabled reusing a pin
			return this.pinIds;
		},
		pins() {
			return this.$store.state.config.pins;
		},
		canCheckCurrentGuess() {
			return this.$store.getters.curGuessIsComplete;
		},
		blockGameInput() {
			return this.$store.getters.blockGameInput;
		}
	},
	methods: {
		addPin(pin) {
			this.$store.dispatch('addPinToCurrentGuess', { pin, idx: null });
		},
		checkCurrentGuess() {
			this.$store.dispatch('makeMove');
		}
	}
};
</script>

<style scoped>
.pin-inputs {
	padding-top: 1rem;
	display: grid;
	grid-auto-flow: row;
	gap: 0.5rem;
	justify-items: center;
	overflow: hidden;
}

.pin-input-btn {
	border: none;
	border-radius: 50%;
	width: 2rem;
	height: 2rem;
	background-color: var(--pin-color);
}

.check-btn {
	width: 100%;
	padding: 0.5rem 0;
	background: rgba(255, 255, 255, 0.8);
	border: 0;
	font-weight: bold;
	color: rgb(61, 48, 28);
	margin-top: 0.5rem;
}
.check-btn:disabled {
	color: rgba(61, 48, 28, 0.7);
	background: rgba(255, 255, 255, 0.6);
}
</style>