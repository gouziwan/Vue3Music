<script setup lang="ts">
import TabbarBottomVue from "./components/TabbarBottom.vue";
import Login from "./components/Login.vue";
import { useStore } from "./state/user";
import Sidebar from "./components/Sidebar.vue";
import { cacheStore } from "./state/Cache";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

// 用户刷新登录的
const state = useStore();

const cache = cacheStore();

const route = useRoute();

state.initLogin();
</script>

<template>
	<div class="page">
		<!-- 头部的 -->
		<div class="page-head">
			<router-view name="hread" v-slot="{ Component }">
				<template v-if="Component">
					<keep-alive max="20" :include="cache.keepHread">
						<component :is="Component"></component>
					</keep-alive>
				</template>
				<template v-else> </template>
			</router-view>
		</div>
		<!-- 身体部分 -->
		<div class="page-centent">
			<router-view v-slot="{ Component }">
				<keep-alive max="20" :include="cache.keepAlive">
					<component :is="Component" :key="$route.name"></component>
				</keep-alive>
			</router-view>
		</div>
		<!-- 底部导航栏  -->

		<div class="page-button">
			<TabbarBottomVue />
		</div>
		<!-- 登录 -->
		<Login />
		<!-- 设置侧边栏 -->
		<Sidebar />
	</div>
</template>

<style lang="scss"></style>
