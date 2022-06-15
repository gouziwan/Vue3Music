<script lang="ts" setup>
import { ref } from "vue";
import { getCatlist } from "../Api/PlayList";
import PlayListHreadVue from "../components/PlayList/PlayListHread.vue";
import { isArray } from "../utils";
import { Tag } from "vant";

const classify = ref({
	categories: {},
	keyArr: [] as any[]
});

getCatlist(res => {
	if (res.code === 200) {
		classify.value.categories = res.categories;

		res.sub.forEach((value: any) => {
			let arr = classify.value.keyArr[value.category];

			if (!isArray(arr)) {
				arr = classify.value.keyArr[value.category] = [];
			}

			arr.push(value);
		});
	}

	console.log(classify.value.keyArr);
});
</script>
<template>
	<div class="all-songs-classify">
		<PlayListHreadVue title="歌单分类" />

		<div class="all-songs-content">
			<div class="all-songs-item" v-for="(item, index) in classify.categories">
				<div class="all-songs-item-title">
					{{ item }}
				</div>
				<div class="item-list-content">
					<div class="all-list-item" v-for="value in classify.keyArr[index]">
						<Tag type="warning" size="large" round>{{ value.name }}</Tag>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.all-songs-classify {
	height: 100%;
	overflow: hidden;
	color: var(--font-main-color);
	display: flex;
	flex-direction: column;
	.all-songs-content {
		height: 100%;
		flex: 1;
		padding: 0 20px;
		box-sizing: border-box;
		overflow: auto;
		.item-list-content {
			display: flex;
			flex-wrap: wrap;
			.all-list-item {
				margin: 20px 20px 20px 0;
			}
		}
	}
}
</style>
