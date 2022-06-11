<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getSerachAdvice } from "../../Api/Search";
import { serachKeyword } from "../../config/routerFrom";
import { useSearchState } from "../../state/search";
import { isArray } from "../../utils";
const router = useRouter();
const keyword = ref(history.state[serachKeyword]);

const state = useSearchState();

// 返回上一级
const onback = () => router.go(-1);

console.log(keyword, history.state);

// 跳转到搜索页面
const onToSearch = () => {
	// 设置keyword
	state.serach = keyword.value;
	// 设为空数组 这个是如果网卡用户体验不好
	state.setSerachResult([]);
	router.replace("Search");
	// 发送请求
	getSerachAdvice(keyword.value, res => {
		if (res.code === 200) {
			console.log(res);
			let v = isArray(res.result.allMatch) ? res.result.allMatch : [];
			state.setSerachResult(v);
		}
	});
};
</script>
<template>
	<div class="serach-detail">
		<van-nav-bar :border="false">
			<template #left>
				<van-icon size="0.4rem" name="arrow-left" color="var(--font-main-color)" @click="onback" />
			</template>

			<template #title>
				<van-search v-model="keyword" shape="round" @click="onToSearch"> </van-search>
			</template>
		</van-nav-bar>
	</div>
</template>

<style lang="scss">
.serach-detail {
	.van-nav-bar__title {
		width: 90%;
		max-width: 100%;
		margin: 0 0 0 auto;
	}
}
</style>
