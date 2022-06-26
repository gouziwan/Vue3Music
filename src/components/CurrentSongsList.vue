<script lang="ts" setup>
import { Popup, ConfigProvider } from "vant";
import { audioStore } from "../state/audios";
import { useStore } from "../state/popup";
import Ellipsis from "./Ellipsis.vue";
import { isArray } from "../utils";
const p = useStore();

const audioState = audioStore();

const themeVars = {
	popupBackgroundColor: "transparent"
};

const isActiveSongs = (item: any) => {
	if (audioState.currentAudios == null) return false;
	return item.id === audioState.currentAudios.id;
};

const onClickPlaySongs = (songs: any) => audioState.addSongsSingle(songs);

const onClickSwiperPlayModel = () => (audioState.isLoopPlay = !audioState.isLoopPlay);

const onClickClone = (songs: any) => {
	audioState.removePlay(songs);
	p.reviseSongs(false);
};
</script>
<template>
	<ConfigProvider :theme-vars="themeVars">
		<Popup v-model:show="p.songs" position="bottom" overlay-class="over-current">
			<div class="current-songs-list">
				<div class="content">
					<div class="title">
						当前播放({{ isArray(audioState.playList) ? audioState.playList.length : 0 }})
					</div>

					<div class="hread-button">
						<van-cell center>
							<template #icon>
								<van-icon
									:name="audioState.isLoopPlay ? 'dogliebiaoxunhuan' : 'dogdanquxunhuan'"
									class-prefix="dog"
									size="0.5rem"
								/>
							</template>
							<template #title>
								<div class="txt" @click="onClickSwiperPlayModel">
									{{ audioState.isLoopPlay ? "循环播放" : "单曲循环" }}
								</div>
							</template>
							<template #value>
								<van-icon name="delete-o" size="0.5rem" @click="audioState.reset" />
							</template>
						</van-cell>
					</div>

					<div class="content-list">
						<van-cell v-for="item in audioState.playList">
							<template #icon>
								<div class="list-icon">
									<van-icon
										v-if="isActiveSongs(item)"
										name="dogshengyin"
										class-prefix="dog"
										size="0.4rem"
										color="red"
									></van-icon>
								</div>
							</template>
							<template #title>
								<div @click="onClickPlaySongs(item)">
									<Ellipsis clamp="1" epsis>
										{{ item.name }}
									</Ellipsis>
								</div>
							</template>
							<template #right-icon>
								<van-icon name="close" @click="onClickClone(item)" />
							</template>
						</van-cell>
					</div>
				</div>
			</div>
		</Popup>
	</ConfigProvider>
</template>

<style lang="scss" scoped>
.over-current {
	opacity: 0.2;
}
.van-popup {
	background: transparent;
}

.title,
.hread-button,
.content-list {
	padding: 0 20px;
}

.current-songs-list {
	color: var(--font-main-color);

	background-color: transparent;
	height: 800px;
	overflow: hidden;
	padding: 0 30px;

	.content {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background-color: var(--background-color-1);
		border-top-left-radius: 30px;
		border-top-right-radius: 30px;
		height: 100%;
		padding: 30px 0;
		.title {
			font-size: 0.4rem;
		}

		.txt {
			margin-left: 10px;
		}

		.content-list {
			padding-bottom: 20px;
			height: 100%;
			flex: 1;
			overflow: auto;

			.list-icon {
				margin-right: 20px;
			}
		}
	}
}
</style>
