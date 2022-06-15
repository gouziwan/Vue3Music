<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getBoutiquePlaylist, getHotCatilst } from "../Api/PlayList";
import { Loading, List } from "vant";
import { isObject, getAcquire, getAncestorNodes } from "../utils";
import EllipsisVue from "../components/Ellipsis.vue";
import { useRouter } from "vue-router";
import { songsId } from "../config/routerFrom";

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
	const item = tab.arr.length > 0 ? tab.arr[tab.arr.length - 1].updateTime : Date.now();

	getBoutiquePlaylist(tab.title, 30, item, res => {
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

function onClick(e: Event) {
	let tagert = e.target as HTMLDivElement;

	tagert = getAncestorNodes(tagert, ".item-list");

	if (!isObject(tagert) || tagert.dataset.id == undefined) return;

	let id = tagert.dataset.id;

	router.push({
		name: "PlayListDetails",
		state: {
			[songsId]: id
		}
	});
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
				<div class="tabs-all-icon">
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
						>
							<template v-if="item.arr.length > 0">
								<div class="item-content" @click="onClick">
									<div class="item-list" v-for="value in item.arr" :data-id="value.id">
										<div class="item-list-imgage">
											<van-image
												:src="getAcquire(value.coverImgUrl, '3000y300')"
												radius="0.3rem"
												lazy-load
											></van-image>
										</div>
										<div class="item-list-txt">
											<EllipsisVue clamp="2" epsis>
												{{ value.name }}
											</EllipsisVue>
										</div>
									</div>
								</div>
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

		.item-content {
			display: flex;
			flex-wrap: wrap;
			margin-top: 20px;
			width: 100%;

			.item-list-imgage {
				width: 230px;
				height: 230px;
			}

			.item-list-txt {
				margin-top: 20px;
			}

			.item-list {
				width: 230px;
				margin: 30px 10px;
			}
		}
	}
}
</style>
