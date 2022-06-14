<script lang="ts" setup>
import { Popup, Toast } from "vant";
import { ref, watchEffect, defineProps } from "vue";
import { upPlayListSongs } from "../Api/PlayListDetails";
import { useStore } from "../state/user";

const props = defineProps(["show", "tranckId"]);

const emit = defineEmits(["update:show"]);

const onClickOverlay = () => {
	emit("update:show", false);
};
const show = ref(false);
const user = useStore();
const songsArr = [...user.likeSongs, ...user.createPlaylist];

watchEffect(() => {
	show.value = props.show;
});

// 点击添加歌曲到歌单
const onClickAddSongs = (value: any) => {
	Toast.loading({ duration: 0, forbidClick: true, message: `加载中` });
	upPlayListSongs("add", value.id, props.tranckId, res => {
		if (res.status === 200) {
			Toast.success("添加成功");
		}
		onClickOverlay();
	});
};
</script>
<template>
	<Popup v-model:show="show" position="bottom" @click-overlay="onClickOverlay">
		<div class="userSongs-list">
			<div class="title">
				<van-cell title="收藏到歌单" center> </van-cell>
			</div>

			<div class="content">
				<van-cell v-for="item in songsArr" center @click="onClickAddSongs(item)">
					<template #icon>
						<van-image
							width="1rem"
							height="1rem"
							:src="item.coverImgUrl"
							radius="0.1rem"
						></van-image>
					</template>
					<template #title>
						<div style="margin-left: 10px">
							{{ item.name }}
						</div>
					</template>
				</van-cell>
			</div>
		</div>
	</Popup>
</template>

<style lang="scss">
.userSongs-list {
	.van-button {
		background-color: transparent;
		color: var(--font-main-color);
	}

	.content {
		height: 500px;
		overflow: auto;
	}
}
</style>
