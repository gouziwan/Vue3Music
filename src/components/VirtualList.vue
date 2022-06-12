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
	let endIndex = startIndex.value + contentSize.value;

	if (!props.data[endIndex]) {
		endIndex = props.data.length;
	}

	return endIndex;
});

// 获取截取数组的长度
const sliceArr = computed(() => {
	const arr = props.data.slice(startIndex.value, getEndIndex.value);

	return arr.length <= 0 ? props.data.slice(0, 1) : arr;
});

const getPaddingTop = computed(() => {
	return startIndex.value * outHeight.value + "px";
});

const getPaddingBottom = computed(() => {
	return (props.data.length - 1 - getEndIndex.value) * outHeight.value + "px";
});

const chiNum = ref(0);

// 添加监听事件
function handelScroll() {
	const box = document.querySelector("#" + props.id)!;

	const content = document.querySelector<HTMLDivElement>(".virtual-content")!;

	box?.addEventListener("scroll", () => {
		if (box?.scrollTop - content.offsetTop < 0) {
			return 0;
		}
		startIndex.value = Math.floor((box.scrollTop - content.offsetTop) / outHeight.value);

		chiNum.value = document.querySelector(".virual-list")?.children.length;
	});
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
				<slot :value="item" :index="index" v-for="(item, index) in sliceArr" :chi="chiNum"></slot>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.virtual-content {
	position: relative;
	.virual-list {
	}
}
</style>
