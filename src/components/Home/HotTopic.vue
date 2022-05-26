<script lang="ts" setup>
import ListModule from "./ListModule.vue";
import { Swipe, SwipeItem } from "vant";
import { getTopic } from "../../Api/Home";
</script>

<template>
	<ListModule title="热门话题" isShow :isButton="false">
		<Swipe>
			<SwipeItem></SwipeItem>
		</Swipe>
	</ListModule>
</template>
