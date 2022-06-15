<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
const onClick = () => router.go(-1);
</script>
<template>
	<van-nav-bar title="歌单广场" :border="false">
		<template #left>
			<van-icon name="arrow-left" color="var(--font-main-color)" size="0.4rem" @click="onClick" />
		</template>
	</van-nav-bar>
</template>
