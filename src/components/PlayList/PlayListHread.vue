<script lang="ts" setup>
import { useRouter } from "vue-router";

const props = defineProps({
	title: {
		type: String,
		default: "歌单广场"
	}
});

const router = useRouter();
const onClick = () => router.go(-1);
</script>
<template>
	<van-nav-bar :title="props.title" :border="false">
		<template #left>
			<van-icon name="arrow-left" color="var(--font-main-color)" size="0.4rem" @click="onClick" />
		</template>
	</van-nav-bar>
</template>
