<script lang="ts" setup>
import { defineProps, computed, ref, watchEffect } from "vue";
import { getAcquire, isArray } from "../utils";

const props = defineProps({
	item: {
		type: Object,
		default: {}
	},
	show: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(["update:show"]);

const label = computed(() => {
	let alia = isArray(props.item.alia) ? props.item.alia.join("-") : "";

	let avtar = isArray(props.item.alia) ? props.item.ar.map((el: any) => el.name).join("/") : "";

	return `<div>${alia}</div><div>${avtar}</div>`;
});

const getImage = computed(() => {
	return getAcquire(props.item.al.picUrl, "100y100");
});

const show = ref(props.show);

watchEffect(() => {
	show.value = props.show;
});

const onClickOverlay = () => {
	emit("update:show", false);
};

const tabs = [
	{
		icon: "dogbofang1",
		title: "播放歌曲"
	},
	{
		icon: "dogshoucang",
		title: "收藏到歌单"
	},
	{
		icon: "dogpinglun",
		title: "评论"
	}
];
</script>

<template>
	<van-popup v-model:show="show" position="bottom" round @click-overlay="onClickOverlay">
		<div class="detailstSong">
			<div class="detailstSong-hread">
				<van-cell>
					<template #icon>
						<div class="img">
							<van-image :src="getImage" width="1.5rem" radius="0.2rem"> </van-image>
						</div>
					</template>

					<template #title>
						<div class="title">
							{{ props.item.name }}
						</div>
					</template>

					<template #label>
						<div class="label" v-html="label"></div>
					</template>
				</van-cell>
			</div>

			<div class="detailstSong-content">
				<van-cell v-for="item in tabs" center>
					<template #icon>
						<van-icon class-prefix="dog" :name="item.icon" size="0.5rem" />
					</template>

					<template #title>
						<div class="title">
							{{ item.title }}
						</div>
					</template>
				</van-cell>
			</div>
		</div>
	</van-popup>
</template>

<style lang="scss">
.detailstSong {
	width: 100%;
	color: var(--font-main-color);

	background-color: var(--background-color-2);

	.detailstSong-hread {
		.img {
			margin-right: 20px;
		}
	}

	.detailstSong-content {
		.title {
			margin-left: 20px;
		}
	}
}
</style>
