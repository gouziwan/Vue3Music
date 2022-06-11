<script lang="ts" setup name="search-hread">
import { useSearchState } from "../../state/search";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { serachHistor } from "../../config/localStorage";
import { antiShaking, isArray } from "../../utils";
import { getSerachAdvice } from "../../Api/Search/index";
import { useRouter } from "vue-router";

const store = useSearchState();
const localStorage = useLocalStorage();
const routers = useRouter();

const onClickSearchButtonTo = () =>
	routers.push({
		path: "/searchdetails",
		state: {
			[serachHistor]: store.serach
		}
	});

const onSubmit = () => {
	if (store.serach.length <= 0) return;
	// 保存历史记录
	if (!isArray(localStorage[serachHistor])) {
		localStorage[serachHistor] = [];
	}

	if (localStorage[serachHistor].indexOf(store.serach) === -1) {
		localStorage[serachHistor].push(store.serach);
	}
	// 跳转路由把参数传给那个页面
	onClickSearchButtonTo();
};

const onChange = (value: string) => {
	antiShaking(() => {
		if (value.length <= 0) return store.setSerachResult(null);
		getSerachAdvice(value, res => {
			if (res.code === 200) {
				let v = isArray(res.result.allMatch) ? res.result.allMatch : [];
				store.setSerachResult(v);
			}
		});
	});
};

const onClickBack = () => {
	if (store.serach.length > 0) {
		store.reset();
	} else {
		routers.go(-1);
	}
};
</script>
<template>
	<van-nav-bar :border="false">
		<template #title>
			<form action="javascript:return">
				<van-search
					shape="round"
					placeholder="搜索歌曲"
					v-model="store.serach"
					@search="onSubmit"
					@update:model-value="onChange"
				/>
			</form>
		</template>
		<template #left>
			<van-icon
				@click="onClickBack"
				color="var(--font-main-color)"
				size="0.4rem"
				name="arrow-left"
			/>
		</template>
		<template #right>
			<div class="right-txt" @click="onSubmit">搜索</div>
		</template>
	</van-nav-bar>
</template>

<style lang="scss">
.van-nav-bar__title {
	width: 100%;
	max-width: 80%;
}

.right-txt {
	color: var(--font-main-color);
	font-size: 0.35rem;
}
</style>
