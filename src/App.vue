<script setup lang="ts">
import TabbarBottomVue from "./components/TabbarBottom.vue";
import Login from "./components/Login.vue";
import AddSongs from "./components/AddSongs.vue";
import { useStore } from "./state/user";

// 用户刷新登录的
const state = useStore();
const keepAlive = ["Home", "User"];
const keepHread = ["home-hread", "user-hread", "search-hread"];

state.initLogin();
</script>

<template>
	<div class="page">
		<div class="page-head">
			<router-view name="hread" v-slot="{ Component }">
				<template v-if="Component">
					<keep-alive max="20" :include="keepHread">
						<component :is="Component"></component>
					</keep-alive>
				</template>

				<template v-else> </template>
			</router-view>
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
