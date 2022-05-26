<script setup lang="ts">
import TabbarBottomVue from "./components/TabbarBottom.vue";

const data = {
	hello: "1",
	key: 2
};
</script>

<template>
	<div class="page">
		<div class="page-head">
			<router-view name="hread" />
		</div>
		<div class="page-centent">
			<router-view />
		</div>
		<div class="page-button">
			<TabbarBottomVue />
		</div>
	</div>
</template>
