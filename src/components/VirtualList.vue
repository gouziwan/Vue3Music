<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
const props = defineProps(["data", "height", "id"]);
// 容器
const content = ref<HTMLDivElement>();

// 容器最大容积
const contentSize = ref(0);

// 开始index
const startIndex = ref(0);

// 单个元素的高度
const outHeight = ref(0);

onMounted(() => {
	getMaxContentNum();
	window.onresize = getMaxContentNum;
	handelScroll();
});

function getMaxContentNum() {
	let list = document.querySelector(".virual-list")!.children[0]! as HTMLDivElement;

	outHeight.value = list.offsetHeight;

	contentSize.value = Math.floor(props.height / list.offsetHeight) + 2;
}

// 获取截至的长度
const getEndIndex = computed(() => {
	let endIndex = startIndex.value + contentSize.value * 2;
	if (!props.data[endIndex]) {
		endIndex = props.data.length;
	}
	return endIndex;
});

// 获取截取数组的长度
const sliceArr = computed(() => {
	let cruuentIndex = 0;

	if (startIndex.value <= contentSize.value) {
		cruuentIndex = 0;
	} else {
		cruuentIndex = startIndex.value - contentSize.value;
	}

	const arr = props.data.slice(cruuentIndex, getEndIndex.value);

	return arr.length <= 0 ? props.data.slice(0, 1) : arr;
});

const getPaddingTop = computed(() => {
	let cruuentIndex = 0;

	if (startIndex.value <= contentSize.value) {
		cruuentIndex = 0;
	} else {
		cruuentIndex = startIndex.value - contentSize.value;
	}

	return cruuentIndex * outHeight.value + "px";
});

const getPaddingBottom = computed(() => {
	return (props.data.length - getEndIndex.value) * outHeight.value + "px";
});

// 添加监听事件
function handelScroll() {
	const box = document.querySelector("#" + props.id)!;

	const content = document.querySelector<HTMLDivElement>(".virtual-content")!;

	box?.addEventListener("scroll", execScroll);

	function execScroll() {
		let fps = 30,
			interval = 1000 / fps,
			then = Date.now();

		// // 优化滚动的时候
		requestAnimationFrame(() => {
			let now = Date.now();
			setStarIndex(box, content);

			if (now - then >= interval) {
				then = now;
				// @ts-ignore
				requestAnimationFrame(arguments.callee);
			}
		});
	}
}

function setStarIndex(box: any, content: HTMLDivElement) {
	if (box?.scrollTop - content.offsetTop < 0) {
		// 手机端防止移除
		return (startIndex.value = 0);
	}

	const currentIndex = Math.floor((box.scrollTop - content.offsetTop) / outHeight.value);

	startIndex.value =
		currentIndex > props.data.length - contentSize.value
			? props.data.length - contentSize.value
			: currentIndex;
}

// 获取总长度
</script>
<template>
	<div class="virtual-content" ref="content">
		<div class="virtual-inner">
			<div
				class="virual-list"
				:style="{
					paddingTop: getPaddingTop,
					paddingBottom: getPaddingBottom
				}"
			>
				<slot :value="item" :index="index" v-for="(item, index) in sliceArr"></slot>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.virtual-content {
	position: relative;
}
</style>
