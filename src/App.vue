<template>
	<div id="app">
		<h1>Mastermind</h1>
		<main class="game">
			<GameBoard
				class="board"
				v-if="gameStarted"
			/>
			<PinInputs
				class="inputs"
				v-if="gameStarted"
			>
			</PinInputs>
			<CodeMaker
				v-if="!gameStarted"
				@start="startGame"
				@start-random="createRandomCode"
			/>
		</main>
	</div>
</template>

<script>
import GameBoard from './components/GameBoard';
import PinInputs from './components/PinInputs';
import CodeMaker from './components/CodeMaker';

export default {
	name: 'App',
	components: {
		GameBoard,
		PinInputs,
		CodeMaker,
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
html {
	box-sizing: border-box;
}
*, *::before, *::after {
	box-sizing: inherit;
}
button {
	cursor: pointer;
}
button:disabled {
	cursor: default;
}

body {
	background-color: rgb(36, 35, 33);
	color: #FAFAFA;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

h1 {
	text-align: center;
}

main.game {
	margin: auto;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	color: black;
}

.game > .board {
	margin: 0;
	background-color: hsl(35, 33%, 75%);
	border-radius: 5px;

	/* Center board using width of sidebar */
	margin-left: 2rem;
}

.game > .inputs {
	margin-top: 1rem;
	border-radius: 0 5px 5px 0;
	background-color: hsl(35, 20%, 60%);

	width: 4rem;
}
</style>
