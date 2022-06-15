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
import { onBeforeRouteLeave } from "vue-router";

onActivated(() => {
	toRouterScroll();
});
//这个是组件离开的时候调用的
onBeforeRouteLeave(upRouterScroll);
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

.home {
	height: 10000px;
}
</style>
