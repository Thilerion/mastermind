<template>
	<div>
		<button @click="randomCode">Willekeurige code</button>
	</div>
</template>

<script>

export default {
	methods: {
		startGame(code) {
			this.$store.dispatch('startGameWithCode', code);
		},
		randomCode() {
			this.$store.dispatch('createRandomCode');
		}
	},
	beforeMount() {
		console.warn("Automatically starting with random code...");
		this.randomCode();
	}
}
</script>

<style scoped>

</style>