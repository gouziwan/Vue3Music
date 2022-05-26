<script setup lang="ts">
import { Tabbar, TabbarItem, Icon } from "vant";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
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
		txt: "我的",
		path: "/User",
		inactiveName: "dogwode4",
		activeName: "dogwode3"
	}
];

const active = ref<string>("/");

const getActiveIcon = (item: any) =>
	active.value === item.path ? item.activeName : item.inactiveName;

watchEffect(() => (active.value = route.path as string));
</script>

<template>
	<Tabbar v-model="active" placeholder :border="false">
		<TabbarItem v-for="(item, index) in tabs" :key="index" :name="item.path" :to="item.path">
			{{ item.txt }}
			<template #icon>
				<Icon size="0.6rem" class-prefix="dog" :name="getActiveIcon(item)" />
			</template>
		</TabbarItem>
	</Tabbar>
</template>

<style lang="scss"></style>
