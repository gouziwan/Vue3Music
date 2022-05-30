<script setup lang="ts">
import TabbarBottomVue from "./components/TabbarBottom.vue";
import Login from "./components/Login.vue";
import { useStore } from "./state/user";
// 用户刷新登录的
const state = useStore();
const keepAlive = ["Home"];
state.initLogin();
</script>

<template>
	<div class="page">
		<div class="page-head">
			<router-view name="hread" />
		</div>
		<div class="page-centent">
			<router-view v-slot="{ Component }">
				<keep-alive max="10" :include="keepAlive">
					<component :is="Component" :key="$route.name"></component>
				</keep-alive>
			</router-view>
		</div>
		<div class="page-button">
			<TabbarBottomVue />
		</div>
		<!-- 登录 -->
		<Login />
	</div>
</template>
