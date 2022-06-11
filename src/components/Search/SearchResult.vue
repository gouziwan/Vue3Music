<script lang="ts" setup>
import { AnyRecord } from "dns";
import { watch } from "vue";
import { useRouter } from "vue-router";
import { serachKeyword } from "../../config/routerFrom";
import { useSearchState } from "../../state/search";
import Ellipsis from "../Ellipsis.vue";

const state = useSearchState();

const router = useRouter();
watch(
	() => state.serachResult,
	() => {
		if (state.serachResult === null) return;

		state.serachResult!.forEach(el => {
			el.keysword = el.keyword.replace(
				new RegExp(`([${state.serach}])`, "g"),
				(n1: any, n2: AnyRecord) =>
					`<div style="color:var(--font-main-color-3);display: inline-block;">${n2}</div>`
			);
		});
	}
);

function onClickToSearch(keyword: string) {
	router.push({
		name: "SearchDeails",
		state: {
			[serachKeyword]: keyword
		}
	});
}
</script>
<template>
	<div class="serach-result">
		<template v-if="state.isSerachResult && state.serachResult!.length > 0">
			<van-cell v-for="item in state.serachResult" center @click="onClickToSearch(item.keyword)">
				<template #title>
					<Ellipsis clamp="1" epsis>
						<div v-html="item.keysword" class="keyword"></div>
					</Ellipsis>
				</template>

				<template #icon>
					<van-icon name="search" />
				</template>
			</van-cell>
		</template>
		<template v-else>
			<van-cell center>
				<template #title>
					<div style="color: rgb(64, 125, 153)" v-show="state.serach.length > 0">
						搜索“ {{ state.serach }}”
					</div>
				</template>
			</van-cell>
		</template>
	</div>
</template>

<style lang="scss">
.serach-result {
	.van-cell::after {
		border-color: var(--border-color-2);
	}

	.keyword {
		margin-left: 10px;
	}
}
</style>
