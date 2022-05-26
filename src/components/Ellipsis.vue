<script lang="ts" setup>
import { ref, computed, StyleValue } from "vue";

const { clamp, epsis, size, color } = defineProps({
	clamp: {
		type: [String, Number],
		default: "2"
	},
	epsis: {
		type: Boolean,
		default: false
	},
	size: {
		type: String,
		default: ""
	},
	color: {
		type: String,
		default: "var(--font-main-color)"
	}
});

const getClassName = computed(() => {
	return ["ellipsis-txt", epsis ? "ellipsis-1" : ""];
});

const getClassStyle = computed(() => {
	let data = {
		fontSize: size,
		color
	} as any;

	if (epsis) {
		data["-webkit-line-clamp"] = clamp;
	}

	return data;
});
</script>
<template>
	<div :class="getClassName" :style="getClassStyle">
		<slot></slot>
	</div>
</template>

<style lang="scss">
.ellipsis-txt {
	overflow: hidden;
	&.ellipsis-1 {
		display: -webkit-box;
		width: 100%;
		-webkit-box-orient: vertical;
	}
}
</style>
