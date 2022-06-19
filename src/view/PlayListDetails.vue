<script lang="ts" setup>
import { computed, onMounted, ref, shallowRef, watchEffect } from "vue";
import { getPlaylistDetails, collectionPlaySongs, getAlbumContent } from "../Api/PlayListDetails";
import { songsId, keyw } from "../config/routerFrom";
import Ellipsis from "../components/Ellipsis.vue";
import { getAcquire, isArray, isObject } from "../utils";
import { useRouter } from "vue-router";
import PlayListContent from "../components/PlayListDetails/PlayListContent.vue";
import { useStore } from "../state/user";
import { useLocalStorage } from "../utils/useLocalStorage";
import { userCookieName } from "../config/localStorage";
import SongListDetails from "../components/SongListDetails.vue";

const id = history.state[songsId];

// 判断是歌单还是专辑 key值
const keyword = history.state[keyw];

const data = ref<any>({});

const navbar = ref<any>();

const isScroll = ref(false);

const router = useRouter();

const userState = useStore();

const storage = useLocalStorage();

const isShowDetails = ref(false);

const currentItem = shallowRef(undefined);

const isPlay = computed(() => (keyword === "专辑" ? false : true));

// 当前歌单是否收藏
const collection = computed(() => {
	if (!userState.isLogin) return false;

	return isArray(userState.collectSongs)
		? !!userState.collectSongs.filter((el: any) => el.id === data.value.id)[0]
		: false;
});

// 激活的图标样式
const showActiveIcon = computed(() => {
	return collection.value ? "dogshoucang1" : "dogshoucang";
});

// 激活的颜色
const activeColor = computed(() => {
	return collection.value ? "var(--tabbar-active-color)" : "var(--font-main-color)";
});

function isRequestPlays() {
	isPlay.value
		? getPlaylistDetails(id, res => {
				if (res.code === 200) {
					data.value = res.playlist;
				}
		  })
		: getAlbumContent(id, res => {
				if (res.code === 200) {
					data.value = {
						...res.album,
						trackIds: res.songs
					};

					console.log(data);
				}
		  });
}

isRequestPlays();

// 获取简介
const getAbstract = computed(() => {
	const descr = data.value.description;
	return descr && descr.length > 0 ? descr : "暂无简介";
});

// 加载背景图片
watchEffect(() => {
	let back = document.querySelector<HTMLImageElement>(".details_back>.details_back_img")!;

	let navBack = document.querySelector<HTMLImageElement>(".van-nav-bar-content>.details_back_img")!;

	const img = data.value.coverImgUrl || data.value.blurPicUrl;

	if (isObject(data.value) && back) {
		back.src = img;
		navBack.src = img;
	}
});

// 滚动条时间
onMounted(() => {
	let box = document.querySelector(".paly_list-details")!;

	let back = document.querySelector<HTMLDivElement>(".details_back")!;

	let height = Number(window.getComputedStyle(back).height.replace("px", ""));

	box.addEventListener("scroll", e => {
		const top = box.scrollTop;
		top > 0 ? (isScroll.value = true) : (isScroll.value = false);
		// 往上移动的时候背景图也往上移动
		back.style.top = -top + "px";
		if (top < 0) {
			back.style.top = 0 + "px";
			back.style.height = height + Math.abs(top) + "px";
		}
	});
});

// 获取创建者的头像
const getAuthorImage = computed(() => {
	const value = data.value;

	if (isPlay.value) {
		return isObject(value.creator) && value.creator.avatarUrl
			? getAcquire(value.creator.avatarUrl)
			: "";
	} else {
		return isObject(value.artist) && value.artist.img1v1Url
			? getAcquire(value.artist.img1v1Url)
			: "";
	}
});

// 获取创建者的名字
const getAvatarName = computed(() => {
	const value = data.value;

	if (isPlay.value) {
		return isObject(value.creator) && value.creator.nickname ? value.creator.nickname : "";
	} else {
		return isObject(value.artist) && value.artist.name ? value.artist.name : "";
	}
});

// 返回上一级
const onBack = () => router.go(-1);

// 点击收藏或取消收藏歌单
const onClickConllection = () => {
	// 判断是否登录状态不是弹出登录
	if (!userState.isExecLogin()) return;
	// 目前收藏不了
	collectionPlaySongs(data.value.id, !collection.value, storage[userCookieName], (res, data) => {});
};

const onClickShowDefault = (item: any) => {
	currentItem.value = item;
	isShowDetails.value = true;
};
</script>
<template>
	<div class="paly_list-details" id="paly_list-details">
		<div class="details_hread">
			<van-nav-bar :border="false" fixed placeholder z-index="99" ref="navbar">
				<template #title>
					<div class="title">{{ isPlay ? "歌单" : "专辑" }}</div>
				</template>
				<template #left>
					<van-icon
						name="arrow-left"
						color="var(--font-main-color)"
						size="0.4rem"
						@click="onBack"
					/>
				</template>
			</van-nav-bar>
			<div class="van-nav-bar-content" v-show="isScroll">
				<img class="details_back_img" />
				<div class="mask"></div>
			</div>

			<div class="details_avatar">
				<van-cell label-class="cell-label" :border="false">
					<template #icon>
						<van-image
							:src="getAcquire(data.coverImgUrl || data.blurPicUrl, '200y200')"
							width="3rem"
							height="3rem"
							radius="0.3rem"
						>
						</van-image>
					</template>
					<template #title>
						<div class="cell-title-content">
							<Ellipsis clamp="1" epsis>
								{{ data.name }}
							</Ellipsis>

							<div class="cell-avatar">
								<van-image :src="getAuthorImage" width="0.7rem" height="0.7rem" round>
									<template #loading>
										<van-icon name="photo-o" size="0.5rem" />
									</template>
								</van-image>
								<span class="cell-text">
									{{ getAvatarName }}
								</span>
							</div>
						</div>
					</template>
					<template #label>
						<div class="descr">
							<Ellipsis clamp="1" epsis>
								{{ getAbstract }}
							</Ellipsis>
							<van-icon name="arrow" />
						</div>
					</template>
				</van-cell>
			</div>
			<div class="details_back" v-show="isObject(data)">
				<img src="" class="details_back_img" />
				<div class="mask"></div>
			</div>

			<!-- 胶囊 -->
			<div class="details-groud">
				<div class="details-left-button" @click="onClickConllection">
					<van-icon
						:name="showActiveIcon"
						class-prefix="dog"
						size="0.4rem"
						:color="activeColor"
					></van-icon>
					<span
						:style="{
							color: activeColor
						}"
					>
						{{ collection ? "已收藏" : "收藏" }}
					</span>
				</div>
				<div class="details-right-button">
					<van-icon name="dogpinglun" class-prefix="dog" size="0.4rem" color="#fff"></van-icon>
					<span> 分享 </span>
				</div>
			</div>
		</div>

		<PlayListContent :tracks="data.trackIds" @click="onClickShowDefault" />

		<SongListDetails :item="currentItem" v-model:show="isShowDetails" />
	</div>
</template>

<style lang="scss">
.paly_list-details {
	height: 100%;
	overflow: auto;
	.details_hread {
		position: relative;
		.title {
			color: var(--font-main-color);
		}
	}

	.cell-title-content {
		margin-left: 30px;

		h1 {
			font-size: 30px;
		}

		.cell-avatar {
			display: flex;
			align-items: center;
			margin-top: 20px;

			.cell-text {
				margin-left: 10px;
				font-size: 25px;
			}
		}
	}

	.van-cell__title {
		position: relative;
		.cell-label {
			position: absolute;
			bottom: 0;
			left: 30px;
		}
	}

	.van-nav-bar {
		background-color: transparent;
	}

	.details_avatar {
		position: relative;
		z-index: 2;

		.descr {
			display: flex;
			align-items: center;
		}
	}

	.details-content {
		margin-top: 30px;
	}

	.van-nav-bar-content {
		position: fixed;
		width: 100%;
		height: 92px;
		z-index: 10;
		top: 0;
		overflow: hidden;

		img {
			width: 200%;
			object-fit: cover;
			height: 400px;
			transform: translateX(-50%);
			left: 50%;
			position: absolute;
		}
	}

	.mask {
		width: 100%;
		height: 100%;
		position: absolute;
		backdrop-filter: blur(30px);
		-webkit-backdrop-filter: blur(30px);
		top: 0;
	}

	.details-groud {
		position: absolute;
		display: flex;
		left: 50%;
		transform: translateX(-50%);
		bottom: -70px;
		.details-left-button,
		.details-right-button {
			display: flex;
			align-items: center;
			background-color: var(--background-color-2);
			padding: 10px 20px;
			border-top-left-radius: 100px;
			border-bottom-left-radius: 100px;
			span {
				color: #fff;
				font-size: 0.3rem;
				margin-left: 10px;
			}
		}

		.details-right-button {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
			border-top-right-radius: 100px;
			border-bottom-right-radius: 100px;
			border-left: solid 1px var(--border-color-2);
		}
	}
}

.details_back {
	position: fixed;
	width: 300%;
	height: 400px;
	border-bottom-left-radius: 50%;
	border-bottom-right-radius: 50%;
	left: 50%;
	transform: translateX(-50%);
	top: 0;
	overflow: hidden;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}
</style>
