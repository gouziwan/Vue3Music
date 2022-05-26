<script lang="ts" setup>
import { getRecommendedDaily } from "../../Api/Home";
import ListModule from "./ListModule.vue";
import { Image } from "vant";
import { ref } from "vue";
import { getAcquire, getArrRoundValue } from "../../utils/index";
import Ellipsis from "../Ellipsis.vue";
let result = ref<any[]>([]);

getRecommendedDaily(res => (result.value = getArrRoundValue(res.result, 10)));
</script>

<template>
	<ListModule :isShow="result.length > 0">
		<div class="home-recea">
			<div class="home-inner">
				<div class="home-recea-items" v-for="item in result">
					<Image
						:src="getAcquire(item.picUrl, '300y300')"
						width="2.5rem"
						height="2.5rem"
						radius="0.3rem"
					></Image>
					<div class="home-txt">
						<Ellipsis epsis clamp="2">
							{{ item.name }}
						</Ellipsis>
					</div>
				</div>
			</div>
		</div>
	</ListModule>
</template>

<style lang="scss">
.home-recea {
	margin-top: 20px;
	padding-bottom: -20px;
	overflow: hidden;
	.home-inner {
		display: flex;
		padding-bottom: 30px;
		overflow: auto;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	.home-recea-items {
		width: 2.5rem;
		margin-right: 20px;
		.home-txt {
			margin-top: 10px;
		}
	}
}
</style>
