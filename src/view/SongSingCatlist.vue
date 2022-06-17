<script lang="ts" setup name="songs-sing-catist">
import PlayListHread from "../components/PlayList/PlayListHread.vue";
import { songsId, TagName } from "../config/routerFrom";
import { List } from "vant";
import { reactive, ref, onActivated } from "vue";
import { getBoutiquePlaylist } from "../Api/PlayList";
import SongsListVue from "../components/SongsList.vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { toRouterScroll, upRouterScroll } from "../routers";

let tag = ref(history.state[TagName]);

const tagState = reactive({
	loading: false,
	finished: false,
	finishedText: "加载完成"
});

const router = useRouter();

const route = useRoute();

const songsArr = ref<any[]>([]);

function onLoad() {
	getBoutiquePlaylist(tag.value, 30, songsArr.value.length, res => {
		// 加载完成
		if (res.code === 200) {
			if (res.more === false && res.playlists.length <= 0) {
				tagState.finished = true;
			} else {
				songsArr.value.push(...res.playlists);
			}
			tagState.loading = false;
		}
	});
}

function onClick(id: number) {
	router.push({
		name: "PlayListDetails",
		state: {
			[songsId]: id
		}
	});
}

onActivated(() => {
	tag.value = history.state[TagName];
	if (route.meta.tag !== tag.value) {
		tagState.loading = true;
		tagState.finished = false;
		songsArr.value = [];
		onLoad();
	} else {
		toRouterScroll(document.querySelector(".songs_sing_catils>.content")!);
	}
});

onBeforeRouteLeave((to, from) => {
	const router = upRouterScroll(
		to,
		from,
		document.querySelector<HTMLDivElement>(".songs_sing_catils>.content")!
	);
	// 缓存tag跳转到指定页面进行tag缓存否则取消
	if (to.name === "PlayListDetails") {
		router.meta!.tag = tag.value;
	} else {
		router.meta!.tag = "";
	}
});
</script>

<template>
	<div class="songs_sing_catils">
		<PlayListHread :title="tag" />
		<div class="content">
			<List
				v-model:loading="tagState.loading"
				:finished="tagState.finished"
				:finishedText="tagState.finishedText"
				@load="onLoad"
				offset="100"
			>
				<SongsListVue :data="songsArr" @click="onClick"></SongsListVue>
			</List>
		</div>
	</div>
</template>

<style lang="scss">
.songs_sing_catils {
	height: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;

	.content {
		height: 100%;
		flex: 1;
		overflow: auto;
	}
}
</style>
