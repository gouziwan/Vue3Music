<script lang="ts" setup>
import { ref } from "vue";
import { serachKeyword } from "../../config/routerFrom";

const keyword = ref(history.state[serachKeyword]);
</script>
<template>
	<div class="serach-detail">
		<van-nav-bar :border="false">
			<template #left>
				<van-icon size="0.4rem" name="arrow-left" color="var(--font-main-color)" />
			</template>

			<template #title>
				<van-search v-model="keyword" shape="round"> </van-search>
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
