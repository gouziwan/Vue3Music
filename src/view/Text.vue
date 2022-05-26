<template>
	测试模板
	<div class="font"></div>
	<sketch-icon :value="active" name="home"></sketch-icon>
	<button @click="onClick">点击更换图标</button>
</template>

<script setup lang="ts">
import { ref } from "vue";

const name = ref("home");

const active = ref(false);

// const onClick = () => {
// 	if (name.value == "arrow-top") {
// 		name.value = "arrow-left";
// 	} else {
// 		name.value = "arrow-top";
// 	}
// };

const onClick = () => {
	active.value = !active.value;
};
</script>

<style>
.font {
	font-size: 100px;
}
</style>
