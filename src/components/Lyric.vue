<script lang="ts" setup>
import { ref, watch, watchEffect } from "vue";
import { getPlaySongsLyric } from "../Api/Audio";
import { audioStore } from "../state/audios";
import { isArray } from "../utils";
import Day from "../utils/Date";

const stroe = audioStore();

const lyricArr = ref<string[][]>([]);

const currentStr = ref("");

const emit = defineEmits(["click"]);

const props = defineProps(["show"]);

const srcoll = ref<HTMLDivElement>();

let isexec = true;

watchEffect(() => {
	if (stroe.currentAudios == null) return;
	const { id } = stroe.currentAudios;
	getPlaySongsLyric(id, res => {
		if (res.code == 200) {
			const {
				lrc: { lyric }
			} = res;
			getLyricArr(lyric);
		}
	});
});

// 处理歌词字符串
function getLyricArr(str: string) {
	let strArr = str.split("\n");
	lyricArr.value = strArr.map(el => el.slice(1).split("]")).filter(el => el[0] != "");
}

function getActive() {
	if (!props.show) return false;

	for (let i = 0; i < lyricArr.value.length; i++) {
		const el = lyricArr.value[i];
		const nextel = lyricArr.value[i + 1];
		if (Day.geleTiem(el[0]) <= stroe.currentTiem) {
			if (
				(isArray(nextel) && stroe.currentTiem < Day.geleTiem(nextel[0])) ||
				(nextel == undefined && i == lyricArr.value.length - 1)
			) {
				currentStr.value = el[0];
				break;
			}
		}
	}
}

watchEffect(getActive);

// 执行动画
watch(
	() => currentStr.value,
	() => {
		if (isexec && props.show) {
			scrollAmaintion();
		}
	}
);

let id = null as any;

function scrollAmaintion() {
	let dom = Array.from(srcoll.value!.children).filter(
		el => el.className === "lyric-list active"
	)[0] as HTMLDivElement;

	if (dom == null) return;

	let offsetTop = dom.offsetTop;

	let oldTop: any = srcoll.value!.scrollTop;

	let h = srcoll.value!.clientHeight / 2;

	let top: any = offsetTop - h < 0 ? 0 : offsetTop - h;

	cancelAnimationFrame(id);
	// 因为要在一秒内执行完所有动画; requestAnimationFrame 大约 16.6ms 执行一次
	let fbs = 200 / 16.6;
	// 可以计算出每 16.6ms 要执行nums
	let count = Math.abs(top - oldTop) / fbs;
	let nums = top > oldTop ? count : -count;
	function amintion() {
		if ((top <= oldTop && nums > 0) || (top >= oldTop && nums < 0)) {
			cancelAnimationFrame(id);
			id = null;
			top = null;
			oldTop = null;
			return;
		}
		oldTop = oldTop + nums;
		srcoll.value!.scrollTop = oldTop;
		return (id = requestAnimationFrame(amintion));
	}
	id = amintion();
}

let sid: any = 0;

// 手指移动的时候
const onTouchmove = () => {
	clearTimeout(sid);
	if (!isexec) return;
	// 关掉关键帧动画
	cancelAnimationFrame(id);
	isexec = false;
};

// 手指 离开的时候触发
const onTouchend = () => {
	sid = setTimeout(() => (isexec = true), 2000);
};

const onClick = () => emit("click");
</script>
<template>
	<div class="lyric-audio" v-show="props.show">
		<div
			class="lyric-scroll"
			ref="srcoll"
			@touchmove="onTouchmove"
			@touchend="onTouchend"
			@click="onClick"
		>
			<p
				class="lyric-list"
				:class="currentStr === item[0] ? 'active' : ''"
				v-for="item in lyricArr"
			>
				{{ item[1] }}
			</p>
		</div>
	</div>
</template>

<style lang="scss">
.lyric-audio {
	height: 95%;
	.lyric-scroll {
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		overflow: auto;
		.lyric-list {
			margin: 15px 0;
			color: rgb(192, 192, 192);
			font-size: 20px;
			&.active {
				color: #fff;
				font-size: 30px;
			}
		}
	}
}
</style>
