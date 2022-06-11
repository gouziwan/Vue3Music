<script lang="ts" setup>
import { computed, ref } from "vue";
import { getPlaylistDetails } from "../Api/PlayListDetails";
import { songsId } from "../config/routerFrom";
import Ellipsis from "../components/Ellipsis.vue";
import { getAcquire, isObject } from "../utils";
const id = history.state[songsId];

const data = ref<any>({});

getPlaylistDetails(id, res => {
	if (res.code === 200) {
		data.value = res.playlist;

		console.log(res.playlist);
	}
});

// 获取简介
const getAbstract = computed(() => {
	const descr = data.value.description;
	return descr && descr.length > 0 ? descr : "暂无简介";
});

// 获取创建者的头像

const getAuthorImage = computed(() => {
	return isObject(data.value.creator) && data.value.creator.avatarUrl
		? getAcquire(data.value.creator.avatarUrl)
		: "";
});
</script>

<template>
	<div class="paly_list-details">
		<div class="details_hread">
			<van-nav-bar :border="false" fixed placeholder z-index="99">
				<template #title>
					<div class="title">歌单</div>
				</template>
				<template #left>
					<van-icon name="arrow-left" color="var(--font-main-color)" size="0.4rem" />
				</template>

				<template #right>
					<van-icon name="search" size="0.4rem" color="var(--font-main-color)" />
				</template>
			</van-nav-bar>

			<div class="details_avatar">
				<van-cell label-class="cell-label" :border="false">
					<template #icon>
						<van-image
							:src="getAcquire(data.coverImgUrl)"
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
								<van-image :src="getAuthorImage" width="1rem" height="1rem" round>
									<template #loading>
										<van-icon name="photo-o" size="0.5rem" />
									</template>
								</van-image>
								<span class="cell-text"> </span>
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

			<div class="details-content">
				<van-cell v-for="item in 100" :title="item"> </van-cell>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.paly_list-details {
	height: 100%;
	overflow: auto;
	.details_hread {
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

	.details_back {
		position: absolute;
		background-color: red;
		width: 200%;
		height: 400px;
		border-bottom-left-radius: 50%;
		border-bottom-right-radius: 50%;
		left: 50%;
		transform: translateX(-50%);
		top: 0;
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
}
</style>
