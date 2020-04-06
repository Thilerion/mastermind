<template>
	<div>
		<div class="current pin-btn-wrapper">
			<PinInput
				v-for="idx in codeLength"
				:key="code.length + '-' + idx"
				:pin="code[idx - 1] == null ? -1 : code[idx - 1]"
				@click.native="removeFromCode(idx - 1)"
			/>
			<button :disabled="code.length < codeLength" @click="finish">Klaar</button>
		</div>
		<div class="inputs">
			<p>Voer een code in:</p>
			<div class="pin-btn-wrapper">
				<PinInput
					v-for="pinType in pins"
					:key="pinType"
					:pin="pinType"
					@click.native="addColor(pinType)"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { PIN_TYPES } from '../constants';
import PinInput from './PinInput';

export default {
	components: {
		PinInput
	},
	data() {
		return {
			codeLength: 4,
			code: [],

			pins: Object.values(PIN_TYPES),
		}
	},
	methods: {
		finish() {
			this.$emit('finish', this.code);
			this.code = [];
		},
		removeFromCode(idx) {
			if (idx >= this.code.length) return;
			this.code.splice(idx, 1);
		},
		addColor(pin) {
			if (this.code.length < this.codeLength) {
				this.code.push(pin);
			}
		}
	}
}
</script>

<style scoped>
.pin-btn-wrapper > * {
	margin-right: 0.25rem;
}
.pin-btn-wrapper {
	display: inline-flex;
	align-items: center;
	margin-right: -0.25rem;
	height: 2.5rem;
	min-width: 4rem;
	padding: 0 0.5rem;
	background: rgba(0, 0, 0, 0.2);
	border-radius: 4px;
	border: 1px solid rgba(0, 0, 0, 0.4);
}
</style>