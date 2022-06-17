<script lang="ts" setup>
import { getRecommendedDaily } from "../../Api/Home";
import ListModule from "./ListModule.vue";
import { Image } from "vant";
import { ref } from "vue";
import { getAcquire, getAncestorNodes, getArrRoundValue, isObject } from "../../utils/index";
import Ellipsis from "../Ellipsis.vue";
import { useRouter } from "vue-router";
let result = ref<any[]>([]);

getRecommendedDaily(res => (result.value = getArrRoundValue(res.result, 10)));

const router = useRouter();

const onClickToPlayList = (e: Event) => {
	const node = getAncestorNodes(e.target as HTMLDivElement, ".home-recea-items") as HTMLDivElement;

	const id = isObject(node) && node.dataset ? node.dataset.id : false;

	if (id) {
		router.push({
			name: "PlayListDetails",
			state: {
				id
			}
		});
	}
};

const onClick = () => {
	router.push(`PlayList`);
};
</script>

<template>
	<ListModule :isShow="result.length > 0" @click="onClick">
		<div class="home-recea">
			<div class="home-inner" @click="onClickToPlayList">
				<div class="home-recea-items" v-for="item in result" :data-id="item.id">
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
