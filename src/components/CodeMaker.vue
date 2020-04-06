<template>
	<div>
		<button @click="randomCode">Willekeurige code</button>
		<CodeInput @finish="startGame" />
	</div>
</template>

<script>
import CodeInput from './CodeInput';

export default {
	components: {
		CodeInput
	},
	data() {
		return {
		}
	},
	methods: {
		startGame(code) {
			this.$emit('start', [...code]);
		},
		randomCode() {
			this.$emit('start-random');
		}
	}
}
</script>

<style scoped>

</style>