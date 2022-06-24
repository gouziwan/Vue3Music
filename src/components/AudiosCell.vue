<script lang="ts" setup>
import { getPlaySongsDetails } from "../Api/PlayListDetails";
import { computed, onMounted, ref } from "vue";
import { isObject } from "../utils";
import Ellipsis from "./Ellipsis.vue";
import { Circle } from "vant";
import { audioStore } from "../state/audios";
const value = ref();

const audio = audioStore();

getPlaySongsDetails([{ id: "347230" }], res => {
	value.value = res.songs[0];
});

const getTitle = computed(() => {
	return isObject(value.value) ? value.value.name : "";
});

const getUrl = computed(() => {
	return isObject(value.value) ? value.value.al.picUrl : "";
});

const rate = ref(0);

// 点击开关闭
const onClickSwiperPlay = () => audio.switchPlay();

// 播放状态的按钮
const playIcon = computed(() => (audio.playState ? "pause" : "play"));
</script>
<template>
	<van-cell center>
		<template #icon>
			<van-image :src="getUrl" width="0.8rem" height="0.8rem" radius="0.1rem"></van-image>
		</template>

		<template #title>
			<div class="title">
				<Ellipsis clamp="1" epsis>
					{{ getTitle }}
				</Ellipsis>
			</div>
		</template>

		<template #right-icon>
			<van-icon name="dogbofangliebiao" class-prefix="dog" size="0.55rem"></van-icon>
		</template>

		<template #value>
			<div class="value-icon">
				<div class="value-ciroce" @click="onClickSwiperPlay">
					<Circle :current-rate="rate" :speed="1" :rate="100" layer-color="var()" size="0.6rem">
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
