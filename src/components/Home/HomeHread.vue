<script lang="ts" setup name="home-hread">
import { useRouter } from "vue-router";
import { useStore } from "../../state/popup";
const routers = useRouter();

const onClickToSerach = () => {
	routers.push("Search");
};

const popup = useStore();

const onClickShowSidebar = () => popup.reviseShowSidebar(true);
</script>

<template>
	<div class="home-hread">
		<van-nav-bar>
			<template #title>
				<van-search shape="round" disabled @click="onClickToSerach" />
			</template>
			<template #left>
				<van-icon
					size="0.5rem"
					class-prefix="dog"
					name="dogliebiao"
					color="var(--font-main-color)"
					@click="onClickShowSidebar"
				></van-icon>
			</template>
		</van-nav-bar>
	</div>
</template>

<style lang="scss" scoped>
::v-deep .van-nav-bar__title {
	max-width: 80%;
	width: 100%;
}
</style>
