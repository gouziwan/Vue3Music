<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getSearchResult } from "../Api/Search";
import { serachKeyword } from "../config/routerFrom";
import { SerachTypeKeys } from "../enum/SerachType";
import Ellipsis from "../components/Ellipsis.vue";

interface TabsType {
	title: string;
	arr: any[];
	max: number;
}

const offsetTop = ref(0);

onMounted(
	() =>
		(offsetTop.value =
			document.querySelector<HTMLDivElement>(".serach-detail>.van-nav-bar")!.offsetHeight - 1)
);

const tabsArr = ref<TabsType[]>([
	{ title: "单曲", arr: [], max: 0 },
	{ title: "歌单", arr: [], max: 0 },
	{ title: "视频", arr: [], max: 0 },
	{ title: "专辑", arr: [], max: 0 },
	{ title: "歌词", arr: [], max: 0 }
]);

const keysword = history.state[serachKeyword];

const onRendered = (index: number, title: string) => {
	const tabs = tabsArr.value[index];

	getSearchResult({
		type: title as SerachTypeKeys,
		keywored: keysword,
		callback: res => {
			if (res.code === 200) {
				const { songCount, songs } = res.result;
				tabsArr.value[index].arr = songs;
				tabsArr.value[index].max = songCount;
			}
		}
	});
};

const getAuthorLabel = (item: any) => {
	const str = item.al.name != undefined ? item.al.name : "";

	return item.ar.map((el: any) => el.name).join("") + "-" + str;
};
</script>
<template>
	<div class="serach-details-content">
		<van-tabs
			background="var(--background-main-color)"
			title-inactive-color="var(--font-main-color-1)"
			title-active-color="var(--font-main-color)"
			@rendered="onRendered"
			sticky
			:offset-top="offsetTop"
		>
			<van-tab v-for="(item, index) in tabsArr" :title="item.title" :name="index">
				<div class="serach-details-tabs">
					<van-cell v-if="item.title === '单曲'" title="播放全部" center clickable>
						<template #icon>
							<div class="icon-music-o">
								<van-icon name="music-o" size="0.5rem" />
							</div>
						</template>
					</van-cell>

					<van-cell clickable v-for="value in item.arr" :title="value.name" center>
						<template #label>
							<div class="serach-label">
								<Ellipsis clamp="1" epsis color="var(--font-main-color-3)">
									{{ getAuthorLabel(value) }}
								</Ellipsis>
							</div>
						</template>
						<template #right-icon>
							<van-icon name="doggengduo" class-prefix="dog" size="0.5rem" />
						</template>
					</van-cell>
				</div>
			</van-tab>
		</van-tabs>
	</div>
</template>

<style lang="scss">
.serach-details-content {
	.icon-music-o {
		margin-right: 10px;
		display: flex;
		align-items: center;
	}

	.serach-details-tabs {
		.van-cell::after {
			border-color: var(--border-color-2);
			width: calc(100% - var(--padding-size-medium) * 2);
			left: var(--padding-size-medium);
		}

		.van-cell {
			padding: var(--padding-size-medium);
		}

		.serach-label {
			font-size: 20px;
		}
	}
}
</style>
