<script setup lang="ts">
import TabbarBottomVue from "./components/TabbarBottom.vue";
import Login from "./components/Login.vue";
import { useStore } from "./state/user";
import Sidebar from "./components/Sidebar.vue";
import { cacheStore } from "./state/Cache";
import AudiosCell from "./components/AudiosCell.vue";
import { audioStore } from "./state/audios";
import { onMounted } from "vue";
import CurrentSongsList from "./components/CurrentSongsList.vue";
import AudiosContent from "./components/AudiosContent.vue";
import VideoContent from "./components/VideoContent.vue";

// 用户刷新登录的
const state = useStore();

const cache = cacheStore();

state.initLogin();

const audio = audioStore();

onMounted(() => audio.setAudioNode(document.querySelector<HTMLAudioElement>("#audios")!));
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
			<AudiosCell />
			<TabbarBottomVue />
			<audio id="audios" :src="audio.getAudiosUrl"></audio>
		</div>
		<!-- 登录 -->
		<Login />
		<!-- 设置侧边栏 -->
		<Sidebar />
		<!-- 歌曲列表 -->
		<CurrentSongsList />
		<!-- 歌曲详情展示页 -->
		<AudiosContent />
		<!-- 视频展示页 -->
		<VideoContent />
	</div>
</template>

<style lang="scss">
.van-tabbar--fixed {
	position: relative;
}

.audios {
	position: absolute;
	top: 0;
}
</style>
