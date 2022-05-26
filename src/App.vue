<script setup lang="ts">
import TabbarBottomVue from "./components/TabbarBottom.vue";
import Login from "./components/Login.vue";
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

		<!-- 登录 -->
		<Login />
	</div>
</template>
