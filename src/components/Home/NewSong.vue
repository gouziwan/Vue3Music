<script lang="ts" setup>
import ListModules from "./ListModule.vue";
import { ref, reactive, watchEffect } from "vue";
import { getAlbum, getNewCourier, getNewDisc } from "../../Api/Home";
import { getAcquire, subArr } from "../../utils/index";
import Ellipsis from "../Ellipsis.vue";
import { getPlaySongsDetails } from "../../Api/PlayListDetails";
// import { onClickPlayCurrent } from "../../minxins/audio";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import { keyw, songsId } from "../../config/routerFrom";
import { audioStore } from "../../state/audios";

interface Tabs {
	title: string;
	value: any[];
	cache: any[];
}

const active = ref("新歌");

const nums = 9;

const router = useRouter();

const audioState = audioStore();

// 添加单首歌曲进歌单
function onClickPlayCurrent(songs: any) {
	audioState.addSongsSingle(songs);
}

const tabs: Tabs[] = reactive([
	{
		title: "新歌",
		value: [],
		cache: []
	},
	{
		title: "新碟",
		value: [],
		cache: []
	},
	{
		title: "专辑",
		value: [],
		cache: []
	}
]);

const onClickSwiper = (title: string) => {
	active.value = title;
};

getNewCourier(res => (tabs[0].cache = res.data.slice(0, nums)));

getNewDisc(res => (tabs[1].cache = res.monthData.slice(0, nums)));

getAlbum(res => (tabs[2].cache = res.albums.slice(0, nums)));

const getImageSrc = (item: any, title: string) => {
	let src;

	if (title === "新歌") {
		src = item.album.picUrl;
	} else if (title === "新碟" || title === "专辑") {
		src = item.picUrl;
	}

	return getAcquire(src);
};

const getAvatarTxt = (item: any) => item.artists.map((item: any) => item.name).join("/");

const onClick = (item: any, title: string) => {
	if (title == "专辑") {
		router.push({
			name: "PlayListDetails",
			state: {
				[keyw]: "专辑",
				[songsId]: item.id
			}
		});
	} else {
		getPlaySongsDetails([{ id: item.id }], res => {
			if (res.code == 200 && res.songs.length > 0) {
				onClickPlayCurrent(res.songs[0]);
			} else {
				Toast.fail(`获取歌曲连接失败`);
			}
		});
	}
};

watchEffect(() => {
	const arr = tabs.filter(el => el.title === active.value)[0];
	if (arr.value.length === 0 && arr.cache.length !== 0) {
		arr.value = arr.cache;
	}
});
</script>
<template>
	<ListModules :isShow="tabs[0].value.length > 0" :isButton="false">
		<template #hread>
			<div class="tabs-name">
				<div
					v-for="item in tabs"
					class="tabs-name-item"
					:class="active === item.title ? 'active' : ''"
					@click="onClickSwiper(item.title)"
				>
					{{ item.title }}
				</div>
			</div>
		</template>

		<div class="tabs-content">
			<div class="tabs-content-item" v-for="item in tabs" v-show="item.title === active">
				<van-swipe :show-indicators="false" :loop="false">
					<van-swipe-item v-for="index in 3">
						<van-cell
							clickable
							v-for="value in subArr(item.value, index, 3)"
							:border="false"
							center
							@click="onClick(value, item.title)"
						>
							<template #icon>
								<div class="Image">
									<van-image
										:src="getImageSrc(value, item.title)"
										width="1.5rem"
										radius="0.2rem"
										height="1.5rem"
									></van-image>
								</div>
							</template>

							<template #title>
								<div class="tabs-cell-title">
									<Ellipsis clamp="1" epsis> {{ value.name }} </Ellipsis>
									<Ellipsis clamp="1" epsis size="0.3rem" color="var(--font-main-color-2)">
										{{ getAvatarTxt(value) }}
									</Ellipsis>
								</div>
							</template>
						</van-cell>
					</van-swipe-item>
				</van-swipe>
			</div>
		</div>
	</ListModules>
</template>

<style lang="scss" scoped>
.tabs-name {
	display: flex;
	font-size: 30px;
	.tabs-name-item:nth-child(n + 2):before {
		content: "|";
		margin: 0 10px;
		color: var(--font-main-color-2);
	}

	.tabs-name-item {
		color: var(--font-main-color-2);

		&.active {
			color: var(--font-main-color);
		}
	}

	.Image {
		width: 1.5rem;
		height: 1.5rem;
	}
}
.tabs-content {
	margin-top: 20px;
}

::v-deep(.van-cell) {
	border-radius: 0.2rem;
}

.tabs-cell-title {
	margin-left: 20px;
}
</style>
