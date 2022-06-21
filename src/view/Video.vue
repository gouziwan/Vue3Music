<script lang="ts" setup name="Video">
import { Toast, Loading, List } from "vant";
import { computed, onActivated, ref } from "vue";
import { getVideoClassify, getVideoDefault, giveALike } from "../Api/video";
import PlayListHreadVue from "../components/PlayList/PlayListHread.vue";
import Ellipsis from "../components/Ellipsis.vue";
import { isObject, getAcquire, getPlayCountText } from "../utils";
import { GiveSelectType } from "../enum/giveALike";
import { useStore } from "../state/user";
import { useStore as usePupop } from "../state/popup";
import { useRouter } from "vue-router";

const videoArr = ref<VideoClassifyType[]>([]);

const active = ref(0);

const offsetTop = ref();

const store = useStore();

const pup = usePupop();

const router = useRouter();

const getOffsetTop = computed(() => {
	let top = isObject(offsetTop.value) ? offsetTop.value.offsetTop : 0;
	return top - 1;
});

getVideoClassify(res => {
	if (res.code === 200) {
		res.data.forEach((el: any) => {
			if (el.name !== "MV") {
				videoArr.value.push(createVideo(el.name, el.id));
			}
		});
	} else {
		Toast.fail(res.messages);
	}
});

onActivated(() => (active.value = 0));

function createVideo(name: string, id: number | string, videoArr = []): VideoClassifyType {
	return {
		name,
		id,
		videoArr,
		isLogin: false,
		Finished: false
	};
}

function onLoad() {
	const index = active.value;

	let tabs = videoArr.value[index];

	getVideoDefault(tabs.id, tabs.videoArr.length, res => {
		if (res.code === 200 && res.datas.length <= 0) {
			// 加载完成
			tabs.Finished = true;
		} else if (res.code === 200 && res.datas.length > 0) {
			tabs.videoArr.push(...res.datas);
			tabs.isLogin = false;
		}
	});
}

function showActiveIcon(value: any) {
	// 一开始肯定的 undefined
	return value.isLike == true ? "like" : "like-o";
}

function activeColor(value: any) {
	return value.isLike == true ? "red" : "var(--font-main-color)";
}

function onClickVideoGive(value: any) {
	if (!store.isLogin) {
		Toast.fail(`请登录`);
		pup.reviseShowLogin(true);
		return;
	}
	const {
		data: { vid }
	} = value;

	let str = value.isLike == true ? "取消点赞" : ("点赞" as GiveSelectType);

	giveALike(str, "视频", vid, res => {
		if (res.code == 200) {
			// 点赞成功或者失败
			value.isLike = !value.isLike;
			value.isLike == false ? value.data.praisedCount-- : value.data.praisedCount++;
		}
	});
}

function toCommentsPage() {
	router.push({ name: "Comments" });
}
</script>
<template>
	<div class="video">
		<PlayListHreadVue title="视频" :is-show-left="false" />
		<div class="video-content" v-if="videoArr.length > 0" ref="offsetTop">
			<van-tabs
				v-model:active="active"
				background="var(--background-main-color)"
				title-active-color="var(--font-main-color)"
				title-inactive-color="var(--font-main-color-2)"
				sticky
				:offset-top="getOffsetTop"
			>
				<van-tab v-for="item in videoArr" :title="item.name">
					<div class="video-box">
						<List
							@load="onLoad"
							v-model:loading="item.isLogin"
							:finished="item.Finished"
							offset="100"
						>
							<div class="video-content-item" v-for="value in item.videoArr">
								<div class="images">
									<van-image
										:src="getAcquire(value.data.coverUrl, '500y500')"
										width="100%"
										height="4.5rem"
										radius="0.3rem"
										fit="cover"
										lazy-load
									></van-image>
								</div>

								<div class="video-content-box">
									<div class="title">
										<Ellipsis clamp="1" epsis>
											{{ value.data.title }}
										</Ellipsis>
									</div>

									<div class="avtar">
										<div class="left">
											<div class="image">
												<van-image
													:src="getAcquire(value.data.creator.avatarUrl, '200y200')"
													round
													width="0.8rem"
													lazy-load
												>
												</van-image>
											</div>

											<div class="name">
												{{ value.data.creator.nickname }}
											</div>
											<van-icon name="arrow" />
										</div>

										<div class="right">
											<div class="icon" @click="onClickVideoGive(value)">
												<van-icon
													:name="showActiveIcon(value)"
													:color="activeColor(value)"
													size="0.35rem"
												/>
												<p>{{ getPlayCountText(value.data.praisedCount) }}</p>
											</div>
											<div class="icon" @click="toCommentsPage">
												<van-icon name="chat-o" size="0.35rem" />
												<p>{{ getPlayCountText(value.data.commentCount) }}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</List>
					</div>
				</van-tab>
			</van-tabs>
		</div>

		<div class="video-load" v-else>
			<Loading size="0.5rem"> 加载中。。。 </Loading>
		</div>
	</div>
</template>

<style lang="scss">
.video {
	color: var(--font-main-color);
	height: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	background-color: transparent;
	.video-content {
		height: 100%;
		flex: 1;
		overflow: auto;
		.video-box {
			padding: 20px;
		}
		.video-content-item {
			padding: 20px;
			background-color: var(--background-color-1);
			border-radius: 0.3rem;

			margin-top: 20px;
			.images {
				width: 100%;
				height: 4.5rem;
			}

			.avtar {
				margin-top: 20px;
				display: flex;

				.left {
					display: flex;
					align-items: center;
					width: 100%;
					flex: 1;
					.image {
						width: 0.8rem;
						height: 0.8rem;
						margin-right: 10px;
					}
				}

				.right {
					display: flex;
					align-items: center;
					.icon {
						display: flex;
						align-items: center;
						p {
							margin: 0 10px;
							font-size: 0.35rem;
						}
					}
				}
			}
		}

		.video-content-box {
			.title {
				margin-top: 20px;
				font-size: 25px;
			}
		}
	}

	.video-load {
		text-align: center;
	}
}
</style>
