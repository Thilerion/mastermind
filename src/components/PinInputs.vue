<template>
	<div class="pin-inputs">
		<button
			v-for="pinId in availPins"
			:key="pinId"
			class="pin-input-btn"
			:style="{ '--pin-color': pins[pinId].color }"
			@click="addPin(pinId)"
		></button>
		<button
			class="check-btn"
			@click="checkCurrentGuess"
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
		}
	},
	methods: {
		addPin(pinId) {
			this.$store.dispatch('addPinToCurrentGuess', pinId);
		},
		checkCurrentGuess() {
			this.$store.dispatch('finalizeCurrentGuess');
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
</style>