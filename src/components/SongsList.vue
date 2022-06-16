<script lang="ts" setup>
import { getAcquire, getAncestorNodes, isObject } from "../utils";
import EllipsisVue from "./Ellipsis.vue";

interface Props {
	data: any[];
}

const props = withDefaults(defineProps<Props>(), {
	data: [] as any
});

const emit = defineEmits(["click"]);

function onClick(e: Event) {
	let tagert = e.target as HTMLDivElement;

	tagert = getAncestorNodes(tagert, ".item-list");

	if (!isObject(tagert) || tagert.dataset.id == undefined) return;

	let id = tagert.dataset.id;

	if (!id) return;

	emit("click", id);
}
</script>
<template>
	<div class="item-content" @click="onClick">
		<div class="item-list" v-for="value in props.data" :data-id="value.id">
			<div class="item-list-imgage">
				<van-image
					:src="getAcquire(value.coverImgUrl, '300y300')"
					radius="0.3rem"
					lazy-load
				></van-image>
			</div>
			<div class="item-list-txt">
				<EllipsisVue clamp="2" epsis>
					{{ value.name }}
				</EllipsisVue>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.item-content {
	display: flex;
	flex-wrap: wrap;
	margin-top: 20px;
	width: 100%;

	.item-list-imgage {
		width: 230px;
		height: 230px;
	}

	.item-list-txt {
		margin-top: 20px;
	}

	.item-list {
		width: 230px;
		margin: 30px 10px;
	}
}
</style>
