<script lang="ts" setup>
import { ref } from "vue";
import { getCatlist } from "../Api/PlayList";
import PlayListHreadVue from "../components/PlayList/PlayListHread.vue";
import { getAncestorNodes, isArray, isObject } from "../utils";
import { Tag, Loading } from "vant";
import { useRouter } from "vue-router";
import { TagName } from "../config/routerFrom";

const classify = ref({
	categories: {},
	keyArr: [] as any[]
});

const router = useRouter();

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
});

const onClick = (e: Event) => {
	let target = e.target as HTMLDivElement;

	target = getAncestorNodes(target, ".all-list-item");

	if (isObject(target) && target.dataset.tag) {
		let name = target.dataset.tag;
		router.push({
			name: "SongSingCatlist",
			state: {
				[TagName]: name
			}
		});
	}
};
</script>
<template>
	<div class="all-songs-classify">
		<PlayListHreadVue title="歌单分类" />

		<div class="all-songs-content">
			<template v-if="classify.keyArr.length > 0">
				<div class="all-songs-item" v-for="(item, index) in classify.categories">
					<div class="all-songs-item-title">
						{{ item }}
					</div>
					<div class="item-list-content" @click="onClick">
						<div
							class="all-list-item"
							v-for="value in classify.keyArr[index]"
							:data-tag="value.name"
						>
							<Tag size="large" round>
								<van-icon v-if="value.hot" name="fire-o" color="#ee0a24" />
								<div class="label">
									{{ value.name }}
								</div>
							</Tag>
						</div>
					</div>
				</div>
			</template>

			<div class="logadin" v-else>
				<Loading>加载中...</Loading>
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
				padding: 10px 20px;
				background-color: var(--background-color-2);
				border-radius: 100px;
				.van-tag {
					background-color: transparent;
					display: flex;
					justify-content: center;
				}
				.label {
					font-size: 25px;
					margin-left: 5px;
				}
			}
		}
		.all-songs-item-title {
			font-size: 30px;
		}
	}

	.logadin {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
}
</style>
