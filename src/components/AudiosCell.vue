<script lang="ts" setup>
import { getPlaySongsDetails } from "../Api/PlayListDetails";
import { computed, ref } from "vue";
import { isObject } from "../utils";
import Ellipsis from "./Ellipsis.vue";
import { Circle } from "vant";
import { audioStore } from "../state/audios";
import { useStore } from "../state/popup";
const value = ref();

const audio = audioStore();

const p = useStore();

getPlaySongsDetails([{ id: "347230" }], res => {
	value.value = res.songs[0];
});

const getTitle = computed(() => {
	return isObject(value.value) ? value.value.name : "";
});

const getUrl = computed(() => {
	return isObject(value.value) ? value.value.al.picUrl : "";
});

const rateTiem = computed(() => {
	if (audio.duration == 0) return 0;
	return audio.currentTiem / (audio.duration / 100);
});
// 点击开关闭
const onClickSwiperPlay = () => audio.switchPlay();
// 播放状态的按钮
const playIcon = computed(() => (audio.playState ? "pause" : "play"));
// 点击显示歌曲列表
const onClickShowSongsPlay = () => p.reviseSongs(true);
</script>
<template>
	<van-cell center>
		<template #icon>
			<van-image
				:src="audio.getAudiosImage"
				width="0.8rem"
				height="0.8rem"
				radius="0.1rem"
			></van-image>
		</template>

		<template #title>
			<div class="title">
				<Ellipsis clamp="1" epsis>
					{{ audio.getAudiosTitle }}
				</Ellipsis>
			</div>
		</template>

		<template #right-icon>
			<van-icon
				name="dogbofangliebiao"
				class-prefix="dog"
				size="0.55rem"
				@click="onClickShowSongsPlay"
			></van-icon>
		</template>

		<template #value>
			<div class="value-icon">
				<div class="value-ciroce" @click="onClickSwiperPlay">
					<Circle :current-rate="rateTiem" :speed="1" :rate="100" size="0.6rem">
						<van-icon :name="playIcon" />
					</Circle>
				</div>
			</div>
		</template>
	</van-cell>
</template>

<style lang="scss" scoped>
.title {
	margin-left: 10px;
}

.value-icon {
	height: 0.6rem;
	margin-right: 20px;
	position: relative;

	.value-ciroce {
		position: absolute;
		right: 0;
	}
}

::v-deep(.van-circle) {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
