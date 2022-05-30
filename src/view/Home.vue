<script lang="ts" setup name="Home">
import Banner from "../components/Home/Banner.vue";
import MenuBar from "../components/Home/MenuBar.vue";
import RecommendedDai from "../components/Home/RecommendedDai.vue";
import NewSong from "../components/Home/NewSong.vue";
import RankingList from "../components/Home/RankingList.vue";
import Video from "../components/Home/Video.vue";
import HotTopic from "../components/Home/HotTopic.vue";
import { onActivated } from "vue";
import { toRouterScroll } from "../routers/index";

onActivated(() => {
	console.log(`组件激活`);
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
.home {
	height: 10000px;
}
</style>
