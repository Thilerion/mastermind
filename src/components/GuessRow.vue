<template>
	<div class="guess-row">
		<div class="row-num">{{row}}</div>
		<div class="guess">
			<div
				class="pin guess-pin"
				v-for="pinColor in colors"
				:key="pinColor"
				:style="{ background: pinColor }"
			></div>
		</div>
		<div class="correct-pins">
			<div
				class="pin eval-pin"
				:style="{ background: 'black' }"
				v-for="n in evaluation.black"
				:key="n"
			></div>
			<div
				class="pin eval-pin"
				:style="{ background: 'white' }"
				v-for="n in evaluation.white"
				:key="n"
			></div>
		</div>
	</div>
</template>

<script>
import { PINS } from '../constants';

export default {
	props: {
		row: {
			type: Number,
			required: true
		},
		guess: {
			type: Array,
			required: true
		},
		evaluation: {
			type: Object,
			required: true
		},
	},
	computed: {
		colors() {
			return this.guess.map(pin => PINS[pin].color);
		}
	}
}
</script>

<style scoped>
.guess-row {
	display: flex;
	align-items: center;
}
.row-num {
	width: 2rem;
}
.guess {
	display: flex;
	padding: 0.25rem;
	padding-right: 4rem;
}
.guess-pin {
	margin: 0 0.1rem;
	width: 1rem;
	height: 1rem;
}
.correct-pins {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-areas: 1fr 1fr;
}
.eval-pin {
	width: 0.5rem;
	height: 0.5rem;
	margin: 0.1rem;
}
</style>