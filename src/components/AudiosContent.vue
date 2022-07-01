<script lang="ts" setup>
import { Popup, Toast } from "vant";
import { computed, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { commentsPara } from "../config/routerFrom";
import { audioStore } from "../state/audios";
import { useStore } from "../state/popup";
import { isObject } from "../utils";
import Day from "../utils/Date";

const audio = audioStore();

const p = useStore();

const router = useRouter();

const h = window.innerHeight + "px";

const onClickShow = () => p.revieseAudiosContent(false);

let onInvalidates = undefined;

const contentStyle = computed(() => {
	return {
		backgroundImage: `url(${audio.getAudiosImage})`,
		height: h
	};
});

const getSongsName = computed(() => {
	return isObject(audio.currentAudios) ? audio.currentAudios.name : "";
});

const isLoog = computed(() => {
	return audio.isLoopPlay ? "dogliebiaoxunhuan" : "dogdanquxunhuan";
});

// 切换播放模式
const onClickSwiperModel = () => {
	audio.isLoopPlay = !audio.isLoopPlay;
	Toast(audio.isLoopPlay ? "歌单循环" : "单曲播放");
};

// 跳转到评论
const onClickToComments = () => {
	p.revieseAudiosContent(false);
	router.push({
		name: "Comments",
		state: {
			[commentsPara.id]: audio.currentAudios.id,
			[commentsPara.type]: "歌曲"
		}
	});
};

// 点击显示歌单列表
const onClickShowSongs = () => {
	p.reviseSongs(true);
};

const playIcon = computed(() => {
	return audio.playState ? "dogbofang" : "dogbofang1";
});

//  他可以激活
const image = ref<HTMLDivElement>();

const back = ref<HTMLDListElement>();

const t = ref<HTMLDivElement>();

const onTouchstart = (e: Event) => {
	e.preventDefault();
};

const onTouchmove = (e: TouchEvent) => {
	e.preventDefault();
	requestAnimationFrame(() => {
		const { targetTouches } = e;
		const t = targetTouches[0];
		const parentNode = image.value!.parentNode as HTMLDivElement;
		const left = parentNode.getBoundingClientRect().left;
		const w = parentNode.offsetWidth;
		const iw = image.value!.offsetWidth;
		let x = t.clientX - (left + iw);
		if (x < -iw / 2) {
			x = -iw / 2;
		} else if (x > w - iw / 2) {
			x = w - iw / 2;
		}
		image.value!.style.left = x + "px";
		back.value!.style.width = x + iw / 2 + "px";
	});
};

const onTouchend = (e: Event) => {
	e.preventDefault();
};

// 计算当前播放的位置进度条
const getCurrentX = computed(() => {
	let width = isObject(t.value) ? t.value!.offsetWidth : 0;

	let wi = (audio.currentTiem / audio.duration) * width;

	return wi > width ? width : wi;
});

const backStyle = computed(() => {
	return {
		width: getCurrentX.value! + "px"
	};
});

const sliderStyle = computed(() => {
	const wi = isObject(image.value) ? image.value!.offsetWidth / 2 : 0;
	return {
		left: getCurrentX.value - wi + "px"
	};
});

const date = new Day();
</script>
<template>
	<Popup v-model:show="p.audiosContent" position="bottom">
		<div class="audios-default-content" :style="contentStyle">
			<van-nav-bar :border="false" @click-left="onClickShow" z-index="11">
				<template #title> {{ getSongsName }} </template>
				<template #left>
					<van-icon name="arrow-down" color="var(--font-main-color)" size="0.5rem" />
				</template>
			</van-nav-bar>
			<div class="content">
				<div class="audios-image">
					<div class="audios-content-se">
						<div class="image-ans">
							<div class="image-background"></div>
							<div class="img"></div>
						</div>
					</div>
					<div class="audios-button">
						<van-icon name="like-o" size="0.5rem" />
						<van-icon
							name="dogpinglun"
							class-prefix="dog"
							size="0.5rem"
							@click="onClickToComments"
						/>
						<van-icon name="doggengduo" class-prefix="dog" size="0.5rem" />
					</div>
				</div>
			</div>

			<div class="audios-default-button">
				<div class="audios-progressbar-content">
					<div class="lett-text">{{ date.conversionTiem(audio.currentTiem) }}</div>
					<div class="progressbar">
						<div class="progressbar-t" ref="t"></div>
						<div class="progressbar-back" ref="back" :style="backStyle"></div>
						<img
							src="../assets/dog.png"
							class="dog-icon"
							@touchstart="onTouchstart"
							@touchmove="onTouchmove"
							@touchend="onTouchend"
							ref="image"
							:style="sliderStyle"
						/>
					</div>
					<div class="right-text">{{ date.conversionTiem(audio.duration) }}</div>
				</div>
				<div class="audios-button">
					<van-icon :name="isLoog" class-prefix="dog" size="0.7rem" @click="onClickSwiperModel" />
					<van-icon name="dogshangyishou" class-prefix="dog" size="0.7rem" />
					<van-icon :name="playIcon" class-prefix="dog" size="1rem" @click="audio.playCut" />
					<van-icon name="dogxiayishou" class-prefix="dog" size="0.7rem" />
					<van-icon name="dogliebiao" class-prefix="dog" size="0.7rem" @click="onClickShowSongs" />
				</div>
			</div>
			<div class="back"></div>
		</div>
	</Popup>
</template>

<style lang="scss" scoped>
.audios-buttons {
	display: flex;
	justify-content: space-around;
	margin-top: 30px;
	align-items: center;
}

.audios-default-content {
	color: var(--font-main-color);
	display: flex;
	flex-direction: column;
	overflow: hidden;
	box-sizing: content-box;
	background-size: cover;
	background-position: center;
	position: relative;
	z-index: 1;

	&::after {
		content: "";
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(50px);
		-webkit-backdrop-filter: blur(50px);
	}
}

.content {
	position: relative;
	z-index: 11;
	flex: 1;
	padding: 0 30px;
	.audios-image {
		height: 100%;
		display: flex;
		flex-direction: column;
		.audios-button {
			@extend .audios-buttons;
			margin-bottom: 70px;
			justify-content: space-between;
			padding: 0 50px;
		}
		.audios-content-se {
			height: 100%;
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			.image-ans {
				border-radius: 50%;
				border: solid 1px red;
				width: 500px;
				height: 500px;
			}
		}
	}
}

::v-deep(.van-nav-bar) {
	background-color: transparent;
}

.audios-default-button {
	position: relative;
	z-index: 11;
	margin-bottom: 30px;
	padding: 0 30px;
	.audios-button {
		@extend .audios-buttons;
	}

	.audios-progressbar-content {
		display: flex;
		align-items: center;
		.progressbar {
			width: 100%;
			flex: 1;
			margin: 0 20px;
			position: relative;
			.progressbar-t {
				width: 100%;
				height: 10px;
				background-color: rgb(149, 149, 149);
				border-radius: 100px;
			}

			.progressbar-back {
				@extend .progressbar-t;
				position: absolute;
				top: 0;
				width: 0px;
				background-color: yellow;
			}

			.dog-icon {
				width: 30px;
				height: 30px;
				position: absolute;
				top: -10px;
				left: -15px;
			}
		}
	}
}
</style>
