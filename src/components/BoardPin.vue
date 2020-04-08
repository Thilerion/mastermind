<template>
	<component
		:is="componentType"
		class="board-pin"
		:style="{ '--pin-color': color }"
	></component>
</template>

<script>
export default {
	props: {
		removable: Boolean,
		color: {
			type: String,
			required: true
		}
	},
	computed: {
		componentType() {
			return this.removable ? 'button' : 'div';
		}
	}
};
</script>

<style scoped>
button.board-pin {
	border: 0;
	cursor: pointer;
}
.board-pin {
	background-color: var(--pin-color);
	width: 100%;
	height: 100%;
	border-radius: 50%;
}
</style>