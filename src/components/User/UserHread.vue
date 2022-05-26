<script lang="ts" setup>
import { NavBar, Icon } from "vant";
</script>
<template>
	<NavBar :border="false">
		<template #left>
			<Icon name="dogliebiao" class-prefix="dog" size="0.5rem"></Icon>
		</template>
		<template #right>
			<Icon name="dogsousuo1" class-prefix="dog" size="0.36rem"></Icon>
		</template>
	</NavBar>
</template>

<style lang="scss">
.dog-dogliebiao,
.dog-dogsousuo1 {
	color: var(--font-main-color);
}
</style>
