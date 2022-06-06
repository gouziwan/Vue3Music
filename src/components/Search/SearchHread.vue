<script lang="ts" setup name="search-hread">
import { useSearchState } from "../../state/search";

const store = useSearchState();
</script>
<template>
	<van-nav-bar :border="false">
		<template #title>
			<van-search shape="round" placeholder="搜索歌曲" v-model="store.serach" />
		</template>
		<template #left>
			<van-icon color="var(--font-main-color)" size="0.4rem" name="arrow-left" />
		</template>
		<template #right>
			<div class="right-txt">搜索</div>
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
