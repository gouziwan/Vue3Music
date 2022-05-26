<script lang="ts" setup>
import { Swipe, SwipeItem, Image as VantImage } from "vant";
import { ref } from "vue";
import { getBanner } from "../../Api/Home";

import LoadingContentVue from "../LoadingContent.vue";

const banners = ref<any[]>([]);

getBanner(res => (banners.value = res.banners));

const swipeInstance = ref();

const clickSwipeTo = (index: number) => swipeInstance.value.swipeTo(index);
</script>

<template>
	<div class="home-banner">
		<LoadingContentVue v-if="banners.length <= 0" color="var(--font-main-color-1)" />
		<Swipe autoplay="3000" ref="swipeInstance" v-else>
			<SwipeItem v-for="item in banners">
				<div class="home-banner-item">
					<VantImage width="100%" height="4rem" :src="item.pic" fit="cover" radius="0.2rem" />
				</div>
			</SwipeItem>
			<template #indicator="{ active, total }">
				<div class="custom-indicator">
					<div
						v-for="(item, index) in total"
						class="custom-indicator-item"
						:class="active === index ? 'active' : ''"
						@click="clickSwipeTo(index)"
					></div>
				</div>
			</template>
		</Swipe>
	</div>
</template>

<style lang="scss" scoped>
.home-banner-item {
	padding: 20px 20px;
	box-sizing: border-box;
}

.home-banner {
	height: calc(4rem + 40px);
}

.custom-indicator {
	position: absolute;
	bottom: 30px;
	left: 50%;
	transform: translateX(-50%);
}

.custom-indicator-item {
	display: inline-block;
	margin: 0 5px;
	width: 15px;
	height: 15px;
	border-radius: 50%;
	top: 0;
	background-color: rgba(255, 255, 255, 0.7);
	&.active {
		background-color: var(--tabbar-active-color);
	}
}
</style>
