<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getBoutiquePlaylist, getHotCatilst } from "../Api/PlayList";
import { Loading, List } from "vant";
import { isObject } from "../utils";
import { useRouter } from "vue-router";
import { songsId } from "../config/routerFrom";

import SongsListVue from "../components/SongsList.vue";

const tabs = ref<any[]>([]);

const active = ref(0);

const offset = ref(0);

const contentPage = ref<HTMLDivElement>();

const router = useRouter();

onMounted(() => {
	offset.value = contentPage.value!.offsetTop;
}),
	getHotCatilst(res => {
		if (res.code === 200) {
			res.tags.forEach((el: any) => {
				tabs.value.push(createTabsAttrs(el.name, []));
			});
		}
	});

function createTabsAttrs(title: string, arr: any[]) {
	return {
		title,
		arr,
		isLoading: false,
		// more是没有下一页了
		finished: false,
		// 提示消息
		finisheMessage: ""
	};
}

// 获取active切换的时候是否是第一次请求
function getActive(index: number) {
	const tab = tabs.value[index] as any;

	if (!isObject(tab)) return;

	// 如果是第一次请求的或就请求当前的
	const len = tab.arr.length;

	getBoutiquePlaylist(tab.title, 30, len, res => {
		if (res.code === 200) {
			// 没有下一页说明加载完成
			if (res.playlists.length <= 0 && res.more === false) {
				tab.more = res.more;
				tab.finisheMessage = res.msg;
				// 加载完成
				tab.finished = true;
			} else {
				tab.arr.push(...res.playlists);
				tab.isLoading = false;
			}
		}
	});
}

function onClick(id: string) {
	router.push({
		name: "PlayListDetails",
		state: {
			[songsId]: id
		}
	});
}

function onClickToClassify() {
	router.push(`AllSongsClassify`);
}

// 滚动到底部加载
function onLoad() {
	getActive(active.value);
}
</script>

<template>
	<div class="play_list-page" ref="contentPage">
		<template v-if="tabs.length > 0">
			<div class="tabs">
				<div class="tabs-all-icon" @click="onClickToClassify">
					<van-icon name="apps-o" size="0.5rem" />
				</div>
				<van-tabs
					background="var(--background-main-color)"
					title-inactive-color="var(--font-main-color-1)"
					title-active-color="var(--font-main-color)"
					v-model:active="active"
				>
					<van-tab v-for="item in tabs" :title="item.title">
						<List
							v-model:loading="item.isLoading"
							@load="onLoad"
							:finished="item.finished"
							:finished-text="item.finisheMessage"
							offset="100"
						>
							<template v-if="item.arr.length > 0">
								<SongsListVue :data="item.arr" @click="onClick"></SongsListVue>
							</template>
							<template v-else-if="item.finished">
								<div class="error-message">
									{{ item.message }}
								</div>
							</template>
						</List>
					</van-tab>
				</van-tabs>
			</div>
		</template>

		<template v-else>
			<div class="loging">
				<Loading size="0.5rem" color="var(--tabbar-active-color)"> 加载中。。。 </Loading>
			</div>
		</template>
	</div>
</template>

<style lang="scss">
.play_list-page {
	color: var(--font-main-color);
	height: 100%;
	overflow: hidden;
	padding-bottom: 100px;

	.tabs {
		height: 100%;
		.van-tabs {
			height: 100%;

			.van-tabs__content {
				height: calc(100% - var(--van-tabs-line-height));
				overflow: auto;
			}
		}
	}

	.loging,
	.tabs-logings {
		width: 100%;
		align-items: center;
		display: flex;
		justify-content: center;
		margin-top: 50px;
	}

	.error-message {
		width: 100%;
		text-align: center;
		margin-top: 20px;
		font-size: 30px;
	}

	.tabs {
		position: relative;
		.tabs-all-icon {
			position: absolute;
			top: 0;
			height: 85px;
			z-index: 1;
			display: flex;
			background-color: var(--background-main-color);
			align-items: center;
			justify-content: center;
			right: 0;
			width: 90px;
		}

		.van-tabs__wrap {
			padding-right: 90px;
		}
	}
}
</style>
