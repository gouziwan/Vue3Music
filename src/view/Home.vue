<script lang="ts" setup name="Home">
import Banner from "../components/Home/Banner.vue";
import MenuBar from "../components/Home/MenuBar.vue";
import RecommendedDai from "../components/Home/RecommendedDai.vue";
import NewSong from "../components/Home/NewSong.vue";
import RankingList from "../components/Home/RankingList.vue";
import Video from "../components/Home/Video.vue";
import HotTopic from "../components/Home/HotTopic.vue";
import { onActivated } from "vue";
import { toRouterScroll, upRouterScroll } from "../routers/index";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";

console.log(useRoute());

console.log(useRouter());

onActivated(() => {
	toRouterScroll();
});
//这个是组件离开的时候调用的
onBeforeRouteLeave((to, from) => {
	upRouterScroll(to, from);
});
</script>

<template>
	<div class="home">
		<Banner />
		<MenuBar />
		<RecommendedDai />
		<RankingList />
		<NewSong />
		<Video />
		<!-- <HotTopic /> -->
	</div>
</template>

<style lang="scss">
::v-deep .van-nav-bar__title {
	max-width: 80%;
	width: 100%;
}

::v-deep .van-nav-bar::after {
	content: none;
}
</style>
