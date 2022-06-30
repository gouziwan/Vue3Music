<script lang="ts" setup>
import { Popup, Toast } from "vant";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { commentsPara } from "../config/routerFrom";
import { audioStore } from "../state/audios";
import { useStore } from "../state/popup";
import { isObject } from "../utils";

const audio = audioStore();

const p = useStore();

const router = useRouter();

const h = window.innerHeight + "px";

const onClickShow = () => p.revieseAudiosContent(false);

const contentStyle = computed(() => {
	return {
		backgroundImage: `url(${audio.getAudiosImage})`,
		height: h
	};
});

const getSongsName = computed(() => {
	return isObject(audio.currentAudios) ? audio.currentAudios.name : "";
});

// icon ->
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
					<div class="lett-text">0:00</div>
					<div class="progressbar">
						<div class="progressbar-t"></div>
						<div class="progressbar-back"></div>
						<img src="../assets/dog.png" class="dog-icon" />
					</div>
					<div class="right-text">0:00</div>
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
				width: 30px;
				background-color: yellow;
			}

			.dog-icon {
				width: 30px;
				height: 30px;
				position: absolute;
				top: -10px;
				left: 0;
			}
		}
	}
}
</style>
