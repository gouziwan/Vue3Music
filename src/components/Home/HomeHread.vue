<script lang="ts" setup>
import { Search, Icon } from "vant";
</script>

<template>
	<div class="home-hread">
		<van-nav-bar>
			<template #title>
				<Search shape="round" disabled />
			</template>
			<template #left>
				<Icon
					size="0.6rem"
					class-prefix="dog"
					name="dogliebiao"
					color="var(--font-main-color)"
				></Icon>
			</template>
		</van-nav-bar>
	</div>
</template>

<style lang="scss" scoped>
::v-deep .van-nav-bar__title {
	max-width: 80%;
	width: 100%;
}

::v-deep .van-nav-bar::after {
	content: none;
}
</style>
