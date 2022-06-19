<script lang="ts" setup>
import ListModule from "./ListModule.vue";
import { Image } from "vant";
import { getRecommendedMv } from "../../Api/Home/index";
import { shallowReactive } from "vue";
import Ellipsis from "../Ellipsis.vue";
import { getAcquire } from "../../utils/index";
import { useRouter } from "vue-router";

const router = useRouter();

const videoList = shallowReactive({
	value: [] as any[]
});
getRecommendedMv(res => (videoList.value = res.result));

const onClick = () => {
	router.push("/video");
};
</script>
<template>
	<ListModule title="推荐MV" :isShow="videoList.value.length > 0" @click="onClick">
		<div class="reco-mv">
			<div class="reco-mv-inner">
				<div class="reco-mv-inner-item" v-for="item in videoList.value">
					<Image
						width="3.5rem"
						radius="0.2rem"
						:src="getAcquire(item.picUrl, `${131 * 3}y${74 * 3}`)"
						lazy-load
					/>
					<Ellipsis clamp="2" epsis>
						{{ item.name }}
					</Ellipsis>
				</div>
			</div>
		</div>
	</ListModule>
</template>

<style lang="scss">
.reco-mv-inner {
	display: flex;
	padding: 20px 0;
	overflow: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
	.reco-mv-inner-item {
		margin-right: 20px;
	}
}
</style>
