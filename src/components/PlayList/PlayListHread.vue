<script lang="ts" setup>
import { useRouter } from "vue-router";

const props = defineProps({
	title: {
		type: String,
		default: "歌单广场"
	},
	isShowLeft: {
		type: Boolean,
		default: true
	}
});

const emit = defineEmits(["click"]);

const router = useRouter();
const onClick = () => {
	router.go(-1);
	emit("click");
};
</script>
<template>
	<van-nav-bar :title="props.title" :border="false">
		<template #left>
			<van-icon
				v-if="props.isShowLeft"
				name="arrow-left"
				color="var(--font-main-color)"
				size="0.4rem"
				@click="onClick"
			/>
		</template>
	</van-nav-bar>
</template>
