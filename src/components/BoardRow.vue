<template>
	<li
		class="board-row"
		:class="{current: isCurrentGuess}"
	>
		<div class="row-num">{{row}}</div>
		<div class="guess">
			<div
				v-for="(_, idx) in codeLength"
				:key="idx"
				class="pin-hole"
			>
				<BoardPin
					v-if="guess[idx] != null"
					:removable="isCurrentGuess"
					:color="pins[guess[idx]].color"
				/>
			</div>
		</div>
		<div class="evaluation">
			<div
				class="pin-hole"
				v-for="(evalPin, idx) in evaluationPins"
				:key="evalPin + '-' + idx"
				:class="{ black: evalPin === 'black', white: evalPin === 'white' }"
			>
				<BoardPin
					v-if="evalPin != null"
					:color="evalPin"
				/>
			</div>
		</div>
	</li>
</template>

<script>
import BoardPin from './BoardPin';

export default {
	components: {
		BoardPin
	},
	props: {
		row: {
			type: Number,
			required: true
		},
		guess: {
			type: Array,
			default: () => ([])
		},
		evaluation: {
			type: Object,
			default: () => ({})
		},
		isCurrentGuess: {
			type: Boolean
		}
	},
	computed: {
		hasRemoveClickHandler() {
			return this.isCurrentGuess ? 'click' : null;
		},
		codeLength() {
			return this.$store.state.config.codeLength;
		},
		evaluationPins() {
			const { black = 0, white = 0 } = this.evaluation;
			const remaining = this.codeLength - white - black;
			return [...Array(black).fill('black'), ...Array(white).fill('white'), ...Array(remaining).fill(null)];
		},
		pins() {
			return this.$store.state.config.pins;
		}
	},
	methods: {
		removePin(idx) {
			console.log('Remove pin at idx: ', idx);
		}
	}
}
</script>

<style scoped>
li {
	list-style: none;
}
.board-row {
	display: flex;
	padding: 0.35rem 1rem;
}
.board-row.current {
	background: rgba(255, 255, 255, 0.2);
}

.row-num {
	width: 2.5rem;
	align-self: center;
	color: rgba(0, 0, 0, 0.65);
}

.pin-hole {
	border-radius: 50%;
	min-width: 4px;
	min-height: 4px;
	background-color: rgba(0, 0, 0, 0.2);
	position: relative;
}

.guess {
	display: grid;
	align-items: center;
	grid-auto-flow: column;
	gap: 0.5rem;
	padding-right: 2rem;
}

.guess > .pin-hole {
	width: 1.5rem;
	height: 1.5rem;
}

.evaluation {
	display: grid;
	grid-template-rows: repeat(2, 1fr);
	grid-template-columns: repeat(2, 1fr);
	gap: 0.2rem;
}

.evaluation > .pin-hole {
	width: 0.75rem;
	height: 0.75rem;
}
.evaluation > .pin.white {
	background-color: white;
}
.evaluation > .pin.black {
	background-color: black;
}
</style>