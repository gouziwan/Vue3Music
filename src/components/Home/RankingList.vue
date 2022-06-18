<script lang="ts" setup>
import ListModule from "./ListModule.vue";
import { Swipe, SwipeItem, Image } from "vant";
import { getRankingList, getRankingListSong } from "../../Api/Home/index";
import { ref } from "vue";
import { getAcquire } from "../../utils";
import Ellipsis from "../Ellipsis.vue";
import { useRouter } from "vue-router";

const list = ref<any[]>([]);

const router = useRouter();

getRankingList(async res => {
	let result = await Promise.all(res.list.slice(0, 5).map((el: any) => getRankingListSong(el.id)));
	list.value = result.map((data: any) => data.data.playlist);
});

const getAvatarTxt = (item: any) => {
	let avatar = item.ar.map((v: any) => v.name).join("/");
	return avatar;
};

const onClick = () => {
	router.push("/top");
};
</script>
<template>
	<ListModule title="排行榜" :isShow="list.length > 0" @click="onClick">
		<Swipe :show-indicators="false">
			<SwipeItem v-for="item in list">
				<div class="home-ran-content">
					<div class="home-ran-title">{{ item.name }}</div>
					<div class="home-ran-items" v-for="(val, index) in item.tracks.slice(0, 3)">
						<div class="home-ran-img">
							<Image
								radius="0.3rem"
								width="1.5rem"
								height="1.5rem"
								:src="getAcquire(val.al.picUrl, '100y100')"
							/>
						</div>
						<h3 class="ellipsis-list">{{ index + 1 }}</h3>
						<div>
							<Ellipsis epsis clamp="1" size="0.4rem">
								{{ val.al.name }}
							</Ellipsis>
							<p class="ellipsis-avatar">{{ getAvatarTxt(val) }}</p>
						</div>
					</div>
				</div>
			</SwipeItem>
		</Swipe>
	</ListModule>
</template>

<style lang="scss">
.home-ran-content {
	margin-top: 20px;
	padding: 20px;
	border-radius: 15px;
	.home-ran-title {
		font-size: 30px;
		text-align: center;
	}

	.home-ran-items {
		display: flex;
		align-items: center;
		margin-top: 20px;

		.ellipsis-avatar {
			font-size: 0.3rem;
			color: var(--font-main-color-2);
		}
	}

	.ellipsis-list {
		margin: 0 20px;
	}
}
</style>
