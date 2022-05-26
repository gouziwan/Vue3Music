<script lang="ts" setup>
import { Loading } from "vant";

const props = defineProps({
	color: {
		type: String,
		default: "#000"
	},
	backColor: {
		type: String,
		default: "rgb(56, 56, 56)"
	},
	type: {
		type: String,
		default: "spinner"
	},
	round: {
		type: String,
		default: ""
	},
	txt: {
		type: String,
		default: ""
	}
});
</script>

<template>
	<div
		class="loading-content"
		:style="{
			background: props.backColor,
			borderRadius: props.round
		}"
	>
		<Loading :type="(props.type as any)" :color="props.color" />
		{{ txt }}
	</div>
</template>

<style lang="scss" scoped>
.loading-content {
	width: 100%;
	height: 100%;
	background-color: rgb(56, 56, 56);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}
</style>
