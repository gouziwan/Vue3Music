<script lang="ts" setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import { getPlaylistDetails } from "../Api/PlayListDetails";
import { songsId } from "../config/routerFrom";
import Ellipsis from "../components/Ellipsis.vue";
import { getAcquire, isArray, isObject } from "../utils";
import { useRouter } from "vue-router";
import PlayListContent from "../components/PlayListDetails/PlayListContent.vue";

const id = history.state[songsId];

const data = ref<any>({});

const navbar = ref<any>();

const isScroll = ref(false);

const router = useRouter();

getPlaylistDetails(id, res => {
	if (res.code === 200) {
		data.value = res.playlist;
	}
});

// 获取简介
const getAbstract = computed(() => {
	const descr = data.value.description;
	return descr && descr.length > 0 ? descr : "暂无简介";
});

// 加载背景图片
watchEffect(() => {
	let back = document.querySelector<HTMLImageElement>(".details_back>.details_back_img")!;

	let navBack = document.querySelector<HTMLImageElement>(".van-nav-bar-content>.details_back_img")!;

	if (isObject(data.value) && back) {
		back.src = data.value.coverImgUrl;

		navBack.src = data.value.coverImgUrl;
	}

	console.log(data.value);
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
	return isObject(data.value.creator) && data.value.creator.avatarUrl
		? getAcquire(data.value.creator.avatarUrl)
		: "";
});

// 获取创建者的名字
const getAvatarName = computed(() => {
	return isObject(data.value.creator) && data.value.creator.nickname
		? data.value.creator.nickname
		: "";
});

// 返回上一级
const onBack = () => router.go(-1);
</script>

<template>
	<div class="paly_list-details" id="paly_list-details">
		<div class="details_hread">
			<van-nav-bar :border="false" fixed placeholder z-index="99" ref="navbar">
				<template #title>
					<div class="title">歌单 {{ data.trackCount }}</div>
				</template>
				<template #left>
					<van-icon
						name="arrow-left"
						color="var(--font-main-color)"
						size="0.4rem"
						@click="onBack"
					/>
				</template>

				<template #right>
					<van-icon name="search" size="0.4rem" color="var(--font-main-color)" />
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
							:src="getAcquire(data.coverImgUrl, '200y200')"
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
			<div class="details_back">
				<img src="" class="details_back_img" />
				<div class="mask"></div>
			</div>

			<!-- 胶囊 -->
			<div class="details-groud">
				<div class="details-left-button">
					<van-icon name="dogshoucang" class-prefix="dog" size="0.4rem" color="#fff"></van-icon>
					<span> 收藏 </span>
				</div>
				<div class="details-right-button">
					<van-icon name="dogpinglun" class-prefix="dog" size="0.4rem" color="#fff"></van-icon>
					<span> 分享 </span>
				</div>
			</div>
		</div>

		<PlayListContent :tracks="data.trackIds" />
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
