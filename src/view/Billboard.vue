<script lang="ts" setup name="Billboard">
import { onActivated, reactive, ref } from "vue";
import { getRankingList, getRankingListSong } from "../Api/Home";
import PlayListHreadVue from "../components/PlayList/PlayListHread.vue";
import { isArray, getAcquire, getAncestorNodes } from "../utils";
import Ellipsis from "../components/Ellipsis.vue";
import { useRouter, onBeforeRouteLeave, RouteRecordRaw } from "vue-router";
import { songsId } from "../config/routerFrom";
import { upRouterScroll } from "../routers";
import { isObject } from "@vue/shared";

interface TopList {
	officialList: any[];
	otherList: any[];
}

const topList = reactive<TopList>({
	officialList: [],
	otherList: []
});

const contentNode = ref<HTMLDivElement>();

const router = useRouter();

let currentRoute: undefined | RouteRecordRaw = undefined;

getRankingList(res => {
	if (res.code === 200) {
		res.list.map(async (el: any) => {
			if (el.ToplistType) {
				let res = await getTracksArr(el);
				topList.officialList.push(res);
			} else {
				topList.otherList.push(el);
			}
		});
	}
});

// 获取官方榜的歌曲
function getTracksArr(item: any) {
	return new Promise(resolve => {
		getRankingListSong(item.id, res => {
			if (res.code === 200) {
				res.playlist.updateFrequency = item.updateFrequency;
				resolve(res.playlist);
			}
		});
	});
}

const onClickToPlayDefault = (e: Event, name: string) => {
	let target = e.target as HTMLDivElement;

	target = getAncestorNodes(target, name);

	if (target == null) return;

	let id = target.dataset.id;

	if (id) {
		router.push({
			name: "PlayListDetails",
			state: {
				[songsId]: id
			}
		});
	}
};

// 滚动条缓存的
onActivated(() => {
	if (isObject(contentNode.value) && isObject(currentRoute)) {
		contentNode.value.scrollTop = currentRoute.meta!.top as number;
	}
});

// 添加
onBeforeRouteLeave((to, from) => {
	if (to.name === "PlayListDetails") {
		// 这里主要是保留 当前的路由好方便日后修改 -> 如果他 跳转到 -> PlayListDetails 他肯定是一个对象
		currentRoute = upRouterScroll(to, from, contentNode.value);
	} else {
		// 如果他 跳转到其他地方就是不是->
		currentRoute = undefined;
	}
});
</script>
<template>
	<div class="billboard-page">
		<PlayListHreadVue title="排行榜" />

		<div class="content" ref="contentNode">
			<div class="buillboard-title" v-show="topList.officialList.length > 0">官方榜</div>
			<div
				class="buillboard-content-item"
				@click="onClickToPlayDefault($event, '.content-item-list')"
			>
				<div class="content-item-list" v-for="item in topList.officialList" :data-id="item.id">
					<div class="item-list-left">
						<van-image
							:src="getAcquire(item.coverImgUrl, '250y250')"
							width="3rem"
							radius="0.3rem"
							height="3rem"
							lazy-load
						/>
						<div class="image-text">{{ item.updateFrequency }}</div>
					</div>

					<div class="item-list-right" v-if="isArray(item.tracks)">
						<div class="list" v-for="(tracks, index) in item.tracks.slice(0, 3)">
							<div class="list-icon">{{ index + 1 }}.</div>
							<div class="list-conenten">
								<Ellipsis clamp="1" epsis> {{ tracks.name }}</Ellipsis>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="buillboard-title" v-show="topList.otherList.length > 0">全球榜</div>
			<div class="listWorld" @click="onClickToPlayDefault($event, '.listWorld-item')">
				<div class="listWorld-item" v-for="item in topList.otherList" :data-id="item.id">
					<div class="images">
						<van-image lazy-load :src="getAcquire(item.coverImgUrl, '250y250')" radius="0.3rem" />
					</div>
					<div class="text">
						<Ellipsis clamp="1" epsis>
							{{ item.name }}
						</Ellipsis>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.billboard-page {
	color: var(--font-main-color);
	height: 100%;
	display: flex;
	flex-direction: column;
	.content {
		height: 100%;
		overflow: auto;
		flex: 1;
		padding: 30px;
		.buillboard-title {
			font-size: 25px;
		}

		.buillboard-content-item {
			margin-top: 20px;
			.item-list-left {
				width: 3rem;
				height: 3rem;
				position: relative;

				.image-text {
					position: absolute;
					bottom: 10px;
					right: 10px;
				}
			}

			.content-item-list {
				height: 3rem;
				display: flex;
				margin-bottom: 30px;
			}

			.item-list-right {
				width: 100%;
				.list {
					display: flex;
					align-items: center;
					padding: 0.3rem 0;
					font-size: 25px;
					.list-icon {
						margin: 0 10px;
					}
				}
			}
		}
	}

	.listWorld {
		display: flex;
		flex-wrap: wrap;
		.listWorld-item {
			margin-top: 40px;
			width: 2.8rem;
			margin-right: 0.4rem;

			.images {
				width: 100%;
				height: 2.8rem;
				margin-bottom: 10px;
			}
		}

		.listWorld-item:nth-child(3n) {
			margin-right: 0;
		}
	}
}
</style>
