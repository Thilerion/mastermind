<template>
	<div id="app">
		<h1>Mastermind</h1>
		<CodeMaker
			v-if="!gameStarted"
			@start="startGame"
			@start-random="createRandomCode"
		/>
		<CodeBreaker
			@reset="resetGame"
			v-else
		/>
	</div>
</template>

<script>
import CodeMaker from './components/CodeMaker';
import CodeBreaker from './components/CodeBreaker';

export default {
	name: 'App',
	components: {
		CodeMaker,
		CodeBreaker
	},
	computed: {
		gameStarted() {
			return this.$store.getters.gameStarted;
		}
	},
	methods: {
		startGame(code) {
			this.$store.commit('setSecretCode', code);
		},
		resetGame() {
			this.$store.dispatch('resetGame');
		},
		createRandomCode() {
			this.$store.dispatch('createRandomCode');
		}
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	margin-top: 60px;
	max-width: 700px;
	width: 80vw;
	min-width: 320px;
	margin: 40px auto 0;
}

h1 {
	text-align: center;
}

.pin {
	border-radius: 50%;
	width: 1.5rem;
	height: 1.5rem;
	border: 2px solid black;
}
</style>
