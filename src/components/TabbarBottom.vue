<script setup lang="ts">
import { Tabbar, TabbarItem, Icon } from "vant";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

import {
	leave,
	enterCancelled,
	enter,
	beforeEnter,
	beforeLeave
} from "../transition/tabTransition";

const include = ["Home", "User", "PlayList", "Video"];

const isShow = ref(true);

const route = useRoute();

const tabs = [
	{
		txt: "首页",
		path: "/",
		inactiveName: "dogshouye",
		activeName: "dogshouye1"
	},
	{
		txt: "歌单",
		path: "/PlayList",
		inactiveName: "dogicon-test",
		activeName: "dogyinle2"
	},
	{
		txt: "视频",
		path: "/video",
		inactiveName: "dogdianyingshipin",
		activeName: "dogshipin"
	},
	{
		txt: "我的",
		path: "/User",
		inactiveName: "dogwode4",
		activeName: "dogwode3"
	}
];

const active = ref<string>("/");

const getActiveIcon = (item: any) =>
	active.value === item.path ? item.activeName : item.inactiveName;

watchEffect(() => {
	active.value = route.path as string;

	if (include.indexOf(route.name as any) !== -1) {
		isShow.value = true;
	} else {
		isShow.value = false;
	}
});
</script>

<template>
	<transition
		@before-enter="beforeEnter"
		@enter="enter"
		@enter-cancelled="enterCancelled"
		@leave="leave"
	>
		<Tabbar v-model="active" v-show="isShow" :border="false">
			<TabbarItem v-for="(item, index) in tabs" :key="index" :name="item.path" :to="item.path">
				{{ item.txt }}
				<template #icon>
					<Icon size="0.6rem" class-prefix="dog" :name="getActiveIcon(item)" />
				</template>
			</TabbarItem>
		</Tabbar>
	</transition>
</template>

<style lang="scss"></style>
