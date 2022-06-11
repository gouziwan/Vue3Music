<script lang="ts" setup>
import { table } from "console";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { getTopSerach } from "../../Api/Search/index";
import { serachKeyword } from "../../config/routerFrom";
import { getAncestorNodes } from "../../utils";
import Ellipsis from "../Ellipsis.vue";

const serachResult = ref<any>([]);

const routers = useRouter();

const isShowAll = ref(false);

getTopSerach(res => {
	if (res.code == 200) {
		serachResult.value = res.data;
	}
});

const serachArr = computed(() => {
	if (isShowAll.value) {
		return serachResult.value;
	}
	return serachResult.value.slice(0, 10);
});

const onClickAnAll = () => {
	isShowAll.value = true;
};

const onClickToSerachDetails = (e: any) => {
	const node = getAncestorNodes(e.target, "#serach-content-item");

	if (node != null) {
		let serachWord = node.dataset.searchword;
		routers.push({
			name: "SearchDeails",
			state: {
				[serachKeyword]: serachWord
			}
		});
	}
};
</script>
<template>
	<div class="top-serach">
		<div class="top-serach-title">
			<div>热搜榜</div>
			<div>
				<van-button size="mini" round plain>
					播放
					<template #icon>
						<van-icon name="dog24gf-play" class-prefix="dog"> </van-icon>
					</template>
				</van-button>
			</div>
		</div>
		<div class="content" v-show="serachResult.length > 0" @click="onClickToSerachDetails">
			<div
				id="serach-content-item"
				class="content-item"
				:data-searchword="item.searchWord"
				v-for="(item, index) in serachArr"
				:key="index"
			>
				<van-cell center clickable size="normal">
					<template #title>
						<div class="content-title">
							<Ellipsis epsis clamp="1">
								{{ item.searchWord }}
							</Ellipsis>
						</div>
					</template>
					<template #icon>
						<div class="content-icon">
							{{ index + 1 }}
						</div>
					</template>

					<template v-if="item.iconUrl" #right-icon>
						<van-image :src="item.iconUrl" fit="scale-down" height="0.3rem" :show-loading="false" />
					</template>
				</van-cell>
			</div>

			<div class="showAll" @click="onClickAnAll" v-if="!isShowAll">
				点击展开全部
				<van-icon name="arrow-down" />
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.top-serach {
	.top-serach-title {
		font-size: 25px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.content {
		margin-top: var(--margin-size-medium);
		background-color: var(--background-color-light);
		border-radius: 0.3rem;
		display: flex;
		flex-wrap: wrap;
		font-size: 10px;
		padding: 20px 10px;
	}
	.content-item {
		width: 50%;
		.content-title {
			width: 100%;
			font-size: 25px;
		}

		.content-icon {
			margin-right: 10px;
		}
		&:nth-child(-n + 3) .content-icon {
			color: red;
		}
		&:nth-child(n + 4) .content-icon {
			color: var(--font-main-color-2);
		}
	}

	.van-cell--clickable:active {
		border-radius: 10px;
	}
}

.showAll {
	text-align: center;
	width: 100%;
	margin-top: 10px;
	font-size: 20px;
}

.van-button--plain {
	background-color: transparent;
	color: var(--font-main-color);
	// padding: 0 20px;
}
</style>
