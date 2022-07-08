<script lang="ts" setup>
import { Popup } from "vant";
import { computed, ref, watch } from "vue";
import { getVideoUrl } from "../Api/video";
import { useStore } from "../state/popup";
import { videoState } from "../state/video";
import { Loading } from "vant";

const p = useStore();

const h = window.innerHeight;

const w = window.innerWidth;

const state = videoState();

const videoNode = ref<HTMLVideoElement>();

const urls = ref<any>({});

const getStyle = computed(() => {
	return {
		height: h + "px",
		width: w + "px"
	};
});

watch(
	() => state.currentVideo,
	() => {
		if (state.currentVideo) {
			const { vid } = state.currentVideo.data;
			// 先查缓存
			const url = state.getCacheId(vid);
			if (url) {
				urls.value = url;
				return;
			}
			getVideoUrl(vid, res => {
				if (res.code == 200 && res.urls.length > 0) {
					urls.value = res.urls[0];
					state.cacheUrl(vid, urls.value);
				}
			});
		}
	}
);

watch(
	() => p.videoContent,
	() => {
		if (p.videoContent == false) {
			state.currentVideo = null;
		}
	}
);

const onClickShow = () => {
	p.revieseVideoContent(false);
	videoNode.value!.pause();
	urls.value = {};
};
</script>
<template>
	<Popup v-model:show="p.videoContent" position="right">
		<div class="video-content" :style="getStyle">
			<div class="video-hread">
				<van-nav-bar :border="false" @click-left="onClickShow">
					<template #left>
						<van-icon name="arrow-left" size="0.5rem" color="var(--font-main-color)" />
					</template>
				</van-nav-bar>
			</div>

			<div class="video-conte">
				<div class="video-e">
					<video
						:src="urls.url"
						class="video-v"
						ref="videoNode"
						x5-playsinline="true"
						playsinline="true"
						webkit-playsinline="true"
						controls
						type="video/mp4"
					></video>
				</div>
			</div>
		</div>
	</Popup>
</template>

<style lang="scss" scoped>
.video-content {
	color: var(--font-main-color);
	background-color: var(--background-main-color);
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	width: 100%;

	.video-conte {
		height: 100%;
		display: flex;
		align-items: center;

		.video-e {
			width: 100%;
			transform: translateY(-150px);
			position: relative;
			.video-icon {
				position: absolute;
				top: 50%;

				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
		.video-v {
			width: 100%;
			background-color: var(--background-color-1);
		}
	}
}
</style>
