<script lang="ts" setup>
import { defineProps, watchEffect, shallowRef, computed, onMounted } from "vue";
import { getPlaySongsDetails } from "../../Api/PlayListDetails";
import { isArray } from "../../utils";
import { Loading } from "vant";
import VirtualList from "../VirtualList.vue";
import Ellipsis from "../Ellipsis.vue";
import { keyw } from "../../config/routerFrom";
import { audioStore } from "../../state/audios";

const props = defineProps(["tracks"]);

const songsArr = shallowRef<any[] | null>([]);

const emit = defineEmits(["click"]);

const audioState = audioStore();

const keyword = history.state[keyw];

watchEffect(() => {
	// 不是专辑请求
	if (keyword !== "专辑") {
		if (isArray(props.tracks) && props.tracks.length > 0) {
			getPlaySongsDetails(props.tracks, res => {
				if (res.code == 200) {
					songsArr.value = res.songs.map((el: { index: any }, index: number) => {
						el.index = index;
						return el;
					});
				}
			});
		}
	} else {
		if (isArray(props.tracks)) {
			songsArr.value = props.tracks.map((el: { index: any }, index: number) => {
				el.index = index;
				return el;
			});
		}
	}
});

const isPlaySongs = (item: any) => {
	if (audioState.currentAudios == null) return false;
	return item.id === audioState.currentAudios.id;
};

function onClickPlayCurrent(songs: any) {
	audioState.addSongsSingle(songs);
}

// 点击添加所有歌曲进入所有歌单
const onClickAllPlay = (songsArr: any) => audioState.addAllPlay(songsArr);

const getLabel = function (item: any) {
	return item.ar.map((el: any) => el.name).join("/") + "-" + item.al.name;
};

const getContentHeight = computed(() => {
	let navbar = document.querySelector<HTMLDivElement>(".van-nav-bar__placeholder")!.offsetHeight;
	let button = document.querySelector<HTMLDivElement>(".page-button")!.offsetHeight;
	return window.innerHeight - (navbar + button);
});

onMounted(() => {
	let box = document.querySelector(".paly_list-details")!;

	let cell = null as unknown as HTMLDivElement;

	let div = null as unknown as HTMLDivElement;

	box.addEventListener("scroll", () => {
		if (!cell) {
			cell = document.querySelector<HTMLDivElement>(".play-cell-item")!;
			div = document.querySelector<HTMLDivElement>(".play-cell-div")!;
			cell.style.height = cell.clientHeight + "px";
		}

		if (box.scrollTop <= cell.offsetTop) {
			div.classList.remove("fiex");
		} else {
			div.classList.add("fiex");
		}
	});
});

const onClickShowDefault = (item: any, e: Event) => {
	e.stopPropagation();
	emit("click", item);
};
</script>
<template>
	<div class="play-list-content">
		<!-- 加载 -->
		<div class="play-list-loading" v-if="!(isArray(songsArr) && songsArr!.length > 0)">
			<Loading color="var(--loading-color)" size="0.5rem"> 加载中... </Loading>
		</div>
		<div class="play-item" v-else>
			<div class="play-cell-item">
				<div class="play-cell-div">
					<van-cell :title="`播放全部(${props.tracks.length})`" @click="onClickAllPlay(songsArr)">
						<template #icon>
							<div style="margin-right: 10px">
								<van-icon name="dogbofang1" class-prefix="dog" size="0.4rem" />
							</div>
						</template>
					</van-cell>
				</div>
			</div>
			<template v-if="songsArr!.length > 0">
				<VirtualList :data="songsArr" id="paly_list-details" :height="getContentHeight">
					<template v-slot:default="item">
						<van-cell clickable :border="false" center @click="onClickPlayCurrent(item.value)">
							<template #icon>
								<div class="cell-icon">
									<p v-if="!isPlaySongs(item.value)">{{ item.value.index + 1 }}</p>
									<van-icon
										v-else
										name="dogshengyin"
										class-prefix="dog"
										size="0.4rem"
										color="red"
									></van-icon>
								</div>
							</template>
							<template #title>
								<Ellipsis
									clamp="1"
									epsis
									:color="isPlaySongs(item.value) == false ? 'var(--font-main-color)' : 'red'"
								>
									{{ item.value.name }}
								</Ellipsis>
							</template>
							<template #label>
								<Ellipsis clamp="1" epsis color="var(--font-main-color-2)">
									{{ getLabel(item.value) }}
								</Ellipsis>
							</template>

							<template #right-icon>
								<van-icon
									name="doggengduo"
									class-prefix="dog"
									size="0.4rem"
									@click="onClickShowDefault(item.value, $event)"
								/>
							</template>
						</van-cell>
					</template>
				</VirtualList>
			</template>
		</div>
	</div>
</template>

<style lang="scss">
.play-list-content {
	margin-top: 100px;
	color: var(--font-main-color);
	.play-list-loading {
		text-align: center;
		width: 100%;
	}
	.play-item {
		.play-cell-div {
			width: 100%;
			background-color: var(--background-main-color);
			border-bottom: solid 0.5px var(--border-color-3);
		}

		.play-cell-div.fiex {
			position: fixed;
			top: 92px;
			z-index: 99;
		}
		.cell-icon {
			width: 0.6rem;
		}
	}
}
</style>
