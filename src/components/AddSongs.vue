<script lang="ts" setup>
import { Popup, Cell, Field, Toast } from "vant";
import { computed, ref } from "vue";
import { addUserSongs } from "../Api/user";
import { useStore } from "../state/popup";
import { useStore as useState } from "../state/user";
const state = useStore();

const store = useState();

const input = ref();

const songsName = ref("");

const onOpened = () => {
	let dom = input.value.$el?.querySelector("input") as HTMLInputElement;

	if (dom) {
		Promise.resolve().then(() => dom.focus());
	}
};

const onClickColer = () => state.reviseIsAddSongs(false);

const onClickCrate = () => {
	addUserSongs(songsName.value, res => {
		if (res.code === 200) {
			Toast.success(`创建成功`);
			store.addcreatePlayList(res.playlist, "left");
			state.reviseIsAddSongs(false);
		}
	});
};

const wanStyle = computed(() => {
	return {
		color: songsName.value.length > 0 ? "var(--font-main-color)" : "",
		display: "inline",
		padding: "0 10px"
	};
});
</script>
<template>
	<Popup v-model:show="state.isAddSongs" position="bottom" @opened="onOpened">
		<div class="addSongs-content">
			<div class="addSongs-titlte">
				<Cell center>
					<template #title>
						<div style="display: inline; padding: 0 10px" @click="onClickColer">取消</div>
					</template>
					<template #value>
						<div :style="wanStyle" @click="onClickCrate">完成</div>
					</template>
				</Cell>
			</div>

			<div class="content">
				<div class="content-title">创建歌单</div>
				<Field v-model="songsName" ref="input" placeholder="输入新建歌单标题" />
			</div>
		</div>
	</Popup>
</template>

<style lang="scss">
.addSongs-content {
	background-color: var(--background-color-2);
	color: var(--font-main-color);

	.addSongs-titlte {
		padding: 0 10px;
		box-sizing: border-box;
	}

	.content {
		padding: 0 20px;
	}

	.content-title {
		text-align: center;
		font-size: 30px;
	}
}
</style>
