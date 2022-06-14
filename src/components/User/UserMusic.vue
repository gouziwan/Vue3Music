<script lang="ts" setup>
import { Cell, Icon, Tab, Tabs, Image, SwipeCell, Button, Toast } from "vant";
import { watch, onActivated, ref } from "vue";
import { useStore } from "../../state/user";
import { useStore as userPopup } from "../../state/popup";
import { deleteUserSongs, getUserSongList } from "../../Api/user";
import { isArray, getAcquire } from "../../utils/index";
import Ellipsis from "../Ellipsis.vue";
import { toRouterScroll, upRouterScroll } from "../../routers";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import AddSongs from "../../components/AddSongs.vue";
import { songsId } from "../../config/routerFrom";

const store = useStore();

const popup = userPopup();

const offsetTop = ref(0);

const show = ref(false);

const router = useRouter();

const tabsArr = [
	{
		title: "创建歌单",
		valueIcon: "dogadd",
		rightIcon: "doggengduo",
		defaultIcon: "dogmeiyougengduoxiaoxi",
		// 这个是store 的 name 就是 key
		key: "createPlaylist",
		onAddClick,
		beforeClose: createBeforeClose("createPlaylist")
	},
	{
		title: "收藏歌单",
		valueIcon: null,
		rightIcon: "doggengduo",
		defaultIcon: "dogmeiyougengduoxiaoxi",
		key: "collectSongs",
		beforeClose: createBeforeClose("collectSongs")
	}
];

onActivated(() => {
	if (offsetTop.value === 0) {
		offsetTop.value =
			document.querySelector<HTMLDivElement>(".page-head>.van-nav-bar")!.offsetHeight;
	}

	toRouterScroll();
});

// 缓存滚动条的位置
onBeforeRouteLeave(upRouterScroll);

function onAddClick() {
	if (!store.isLogin) {
		popup.reviseShowLogin(true);
		Toast.fail(`请先登录`);
		return;
	}

	show.value = true;
}

function createBeforeClose(key: string) {
	return (position: any) => {
		if (position.position === "right") {
			return deClose(position.name, key);
		} else {
			return true;
		}
	};
}

const onClickToSongsDefault = (item: any) => {
	let id;

	item === "喜欢的音乐" ? (id = store.likeSongs[0].id) : (id = item.id);

	router.push({
		name: "PlayListDetails",
		state: {
			[songsId]: id
		}
	});
};

const deClose = (id: any, key: string) =>
	new Promise((resolve, reject) => {
		Toast.loading({
			message: `加载中`,
			duration: 0
		});

		deleteUserSongs(id, res => {
			if (res.code == 200) {
				key === "collectSongs" ? store.removeCollectSongs(id) : store.removeCreatePlayList(id);
				resolve(true);
			} else {
				reject();
			}
		});
	}).then(
		() => {
			Toast.success(`删除成功`);
			return true;
		},
		() => {
			Toast.success(`请重试`);
			return true;
		}
	);

watch(
	() => store.isLogin,
	() => {
		if (store.isLogin) {
			getUserSongList(store.userId, res => {
				if (res.code === 200) {
					store.reviseUserSongs(res.playlist);
				}
			});
		}
	},
	{
		immediate: true
	}
);
</script>
<template>
	<div class="user-my-music">
		<div class="user-like-music">
			<Cell
				title="我喜欢的音乐"
				:label="store.getLikeSongsCount"
				center
				@click="onClickToSongsDefault('喜欢的音乐')"
			>
				<template #icon>
					<div class="user-like-icon" v-if="!store.getLikeSonsImag">
						<Icon name="dogiconzhengli" class-prefix="dog" size="0.8rem"></Icon>
					</div>
					<div style="margin-right: var(--margin-size-left-mini)" v-else>
						<Image
							:src="store.getLikeSonsImag"
							width="1.3rem"
							height="1.3rem"
							radius="0.2rem"
						></Image>
					</div>
				</template>
			</Cell>
		</div>
		<div class="user-music-list">
			<Tabs
				background="var(--background-color-light)"
				scrollspy
				title-active-color="var(--font-main-color)"
				sticky
				:offset-top="offsetTop"
			>
				<Tab v-for="item in tabsArr" :title="item.title">
					<div class="user-create-music">
						<div class="create-music-title">
							<Cell>
								<template #title>
									<div class="title">{{ item.title }}</div>
								</template>
								<template #value v-if="item.valueIcon !== null">
									<div class="icon" @click="item.onAddClick">
										<Icon :name="item.valueIcon!" class-prefix="dog" size="0.35rem" />
									</div>
								</template>
							</Cell>
						</div>
						<div class="create-music-content">
							<div class="create-music-list" v-if="isArray(store[item.key])">
								<div
									class="create-music-item"
									v-for="value in store[item.key].slice(0, 5)"
									:key="value.id"
								>
									<SwipeCell :before-close="item.beforeClose" :name="value.id">
										<Cell @click="onClickToSongsDefault(value)">
											<template #icon>
												<div style="margin-right: var(--margin-size-left-mini)">
													<Image
														:src="getAcquire(value.coverImgUrl)"
														width="1.3rem"
														height="1.3rem"
														radius="0.2rem"
													></Image>
												</div>
											</template>
											<template #title>
												<Ellipsis clamp="1" epsis>
													{{ value.name }}
												</Ellipsis>
											</template>
											<template #label>
												<Ellipsis clamp="1" epsis color="var(--font-main-color-3)">
													{{ value.trackCount + "首" }}
												</Ellipsis>
											</template>
										</Cell>

										<template #right>
											<Button square type="danger" text="删除" />
										</template>
									</SwipeCell>
								</div>
							</div>
							<div class="create-music-default" v-else>
								<Icon :name="item.defaultIcon" class-prefix="dog" size="1rem"></Icon>
								<p>暂无{{ item.title }}</p>
							</div>
						</div>
					</div>
				</Tab>
			</Tabs>
		</div>

		<!-- 添加歌曲的界面 -->
		<AddSongs v-model:show="show" />
	</div>
</template>

<style lang="scss">
.user-my-music {
	padding: var(--padding-size-medium);

	.user-like-music {
		background-color: var(--background-color-light);
		border-radius: 0.2rem;
		.van-cell {
			background: transparent;
		}
		.user-like-icon {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 1.3rem;
			width: 1.3rem;
			margin-right: var(--margin-size-left-mini);
			background-color: rgb(90, 90, 90);
			border-radius: 0.2rem;
		}
	}

	.user-music-list {
		margin-top: 20px;
		.user-create-music {
			padding: var(--padding-size-medium);
			background-color: var(--background-color-light);
			margin-top: var(--margin-size-medium);
			border-radius: 0.15rem;

			.van-cell {
				padding: 0px var(--van-cell-horizontal-padding);
			}

			.title {
				font-size: 20px;
			}
			.icon {
				color: var(--font-main-color);
				padding: 0 var(--margin-size-left-mini);
				display: inline-block;
			}

			.icon:nth-child(2) {
				margin: 0;
			}

			.create-music-content {
				min-height: 2rem;

				.create-music-item {
					margin-bottom: var(--margin-size-left-mini);

					.van-cell::after {
						border-bottom: none;
					}
				}

				.create-music-item:nth-last-child(1) {
					margin-bottom: 0;
				}

				.create-music-default {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					min-height: 2rem;
					p {
						margin-top: var(--margin-size-left-mini);
					}
				}
			}
		}
	}
}
</style>
