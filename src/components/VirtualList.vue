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

// 添加监听事件
function handelScroll() {
	const box = document.querySelector("#" + props.id)!;

	const content = document.querySelector<HTMLDivElement>(".virtual-content")!;

	box?.addEventListener("scroll", () => {
		if (box?.scrollTop - content.offsetTop < 0) {
			return;
		}

		startIndex.value = Math.floor((box.scrollTop - content.offsetTop) / outHeight.value);

		console.log(startIndex.value + 1);
	});
}
</script>
<template>
	<div class="virtual-content" ref="content">
		<div class="virtual-inner">
			<div class="virtual-box"></div>
			<div class="virual-list">
				<slot v-for="(item, index) in props.data" :value="item" :index="index"></slot>
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
