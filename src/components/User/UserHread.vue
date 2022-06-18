<script lang="ts" setup name="user-hread">
import { NavBar, Icon } from "vant";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "../../state/popup";

const router = useRouter();

const userState = useStore();

const onClickToSearch = () => {
	router.push("Search");
};

const onClickShowSidebar = () => userState.reviseShowSidebar(true);
</script>
<template>
	<NavBar :border="false">
		<template #left>
			<Icon name="dogliebiao" class-prefix="dog" size="0.5rem" @click="onClickShowSidebar"></Icon>
		</template>
		<template #right>
			<Icon name="dogsousuo1" class-prefix="dog" size="0.36rem" @click="onClickToSearch"></Icon>
		</template>
	</NavBar>
</template>

<style lang="scss">
.dog-dogliebiao,
.dog-dogsousuo1 {
	color: var(--font-main-color);
}
</style>
