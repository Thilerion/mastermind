<template>
	<button
		class="pin-btn pin"
		:style="{background: color}"
	></button>
</template>

<script>
import { PINS } from '../constants';

export default {
	props: {
		pin: {
			type: Number,
			required: true
		}
	},
	computed: {
		color() {
			if (this.pin === -1) return 'transparent';
			return PINS[this.pin].color;
		},
		isEmpty() {
			return this.pin === -1;
		}
	}
}
</script>

<style scoped>
.pin-btn {
	appearance: none;
	display: block;
}
</style>