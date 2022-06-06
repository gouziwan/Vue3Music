<script lang="ts" setup name="user-hread">
import { NavBar, Icon } from "vant";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const onClickToSearch = () => {
	router.push("Search");
};
</script>
<template>
	<NavBar :border="false">
		<template #left>
			<Icon name="dogliebiao" class-prefix="dog" size="0.5rem"></Icon>
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
