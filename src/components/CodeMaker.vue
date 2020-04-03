<template>
	<div>
		<CodeInput @finish="(code) => startGame(code)" />		
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
		}
	}
}
</script>

<style scoped>

</style>