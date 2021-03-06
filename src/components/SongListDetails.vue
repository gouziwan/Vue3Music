<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";
import { useStore } from "../state/user";
import UserSongsListVue from "./UserSongsList.vue";
import { getAcquire, isArray } from "../utils";
import { useRouter } from "vue-router";
import { commentsPara } from "../config/routerFrom";
import { audioStore } from "../state/audios";

const userState = useStore();

const router = useRouter();

const audio = audioStore();

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

function isPlaySongs(item: any) {
	if (audio.currentAudios == null) return false;
	return item.id === audio.currentAudios.id;
}

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

const songShow = ref(false);

watchEffect(() => {
	show.value = props.show;
});

const onClickOverlay = () => {
	emit("update:show", false);
};

function onClickConllectionSongs() {
	if (!userState.isExecLogin()) return;
	songShow.value = true;
	onClickOverlay();
}

const tabs = [
	{
		icon: "dogbofang1",
		title: "播放歌曲",
		fn: () => {
			if (isPlaySongs(props.item)) {
				// 如果他当前播放点击跟他这个id 一致 停止 或者播放
				audio.playCut();
			} else {
				audio.addSongsSingle(props.item);
				emit("update:show", false);
			}
		}
	},
	{
		icon: "dogshoucang",
		title: "收藏到歌单",
		fn: onClickConllectionSongs
	},
	{
		icon: "dogpinglun",
		title: "评论",
		fn: () =>
			router.push({
				name: "Comments",
				state: {
					[commentsPara.id]: props.item.id,
					[commentsPara.type]: "歌曲"
				}
			})
	}
];

function getActiverIcon(icon: string) {
	return audio.playState && isPlaySongs(props.item) ? "dogbofang" : icon;
}
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
				<van-cell v-for="(item, index) in tabs" center @click="item.fn">
					<template #icon>
						<van-icon class-prefix="dog" :name="item.icon" size="0.5rem" v-if="index != 0" />

						<van-icon class-prefix="dog" :name="getActiverIcon(item.icon)" size="0.5rem" v-else />
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
	<UserSongsListVue v-model:show="songShow" :tranckId="props.item.id" />
</template>

<style lang="scss">
.detailstSong {
	width: 100%;
	color: var(--font-main-color);
	background-color: var(--background-color-2);
	.detailstSong-hread {
		.img {
			width: 1.5rem;
			height: 1.5rem;
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
