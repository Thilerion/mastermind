<template>
	<div>
		<button @click="randomCode">
			Willekeurige code
		</button>
	</div>
</template>

<script>

export default {
	beforeMount() {
		console.warn("Automatically starting with random code...");
		this.randomCode();
	},
	methods: {
		startGame(code) {
			this.$store.dispatch("startGame", code);
		},
		randomCode() {
			this.$store.dispatch("createRandomCode");
		}
	}
}
</script>

<style scoped>

</style>