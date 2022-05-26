<script lang="ts" setup>
import ListModules from "./ListModule.vue";
import { ref, reactive, watchEffect } from "vue";
import { getAlbum, getNewCourier, getNewDisc } from "../../Api/Home";
import { Swipe, SwipeItem, Cell, Image as VanImage } from "vant";
import { getAcquire, subArr } from "../../utils/index";
import Ellipsis from "../Ellipsis.vue";

interface Tabs {
	title: string;
	value: any[];
	cache: any[];
}

const active = ref("新歌");

const nums = 9;

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
	switch (title) {
		case "新歌":
			src = item.album.picUrl;
			break;
		case "新碟":
			src = item.picUrl;
			break;
		case "专辑":
			src = item.picUrl;
			break;
	}

	return getAcquire(src);
};

const getAvatarTxt = (item: any) => item.artists.map((item: any) => item.name).join("/");

watchEffect(() => {
	const arr = tabs.filter(el => el.title === active.value)[0];
	if (arr.value.length === 0 && arr.cache.length !== 0) {
		arr.value = arr.cache;
	}
});
</script>
<template>
	<ListModules isShow title="新歌推荐">
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
				<Swipe :show-indicators="false" v-if="item.value.length > 0" :loop="false">
					<SwipeItem v-for="index in 3">
						<Cell v-for="value in subArr(item.value, index, 3)" :border="false" center>
							<template #icon>
								<VanImage
									:src="getImageSrc(value, item.title)"
									width="1.5rem"
									radius="0.2rem"
									height="1.5rem"
								></VanImage>
							</template>

							<template #title>
								<div class="tabs-cell-title">
									<Ellipsis clamp="1" epsis> {{ value.name }} </Ellipsis>
									<Ellipsis clamp="1" epsis size="0.3rem" color="var(--font-main-color-2)">
										{{ getAvatarTxt(value) }}
									</Ellipsis>
								</div>
							</template>
						</Cell>
					</SwipeItem>
				</Swipe>
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
}

.tabs-cell-title {
	margin-left: 20px;
}

::v-deep .van-cell {
	background-color: var(--background-color-2);
}
</style>
