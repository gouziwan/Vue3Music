<script lang="ts" setup>
import { ref, defineProps, watchEffect, shallowRef, computed } from "vue";
import { getPlaySongsDetails } from "../../Api/PlayListDetails";
import { isArray } from "../../utils";
import { Loading } from "vant";
import VirtualList from "../VirtualList.vue";
import Ellipsis from "../Ellipsis.vue";

const props = defineProps(["tracks"]);

const songsArr = shallowRef<any[] | null>(null);

watchEffect(() => {
	if (isArray(props.tracks) && props.tracks.length > 0) {
		getPlaySongsDetails(props.tracks, res => {
			if (res.code == 200) {
				songsArr.value = res.songs;
			}
		});
	}
});

const getLabel = function (item: any) {
	return item.ar.map((el: any) => el.name).join("/") + "-" + item.al.name;
};

const getContentHeight = computed(() => {
	let navbar = document.querySelector<HTMLDivElement>(".van-nav-bar__placeholder")!.offsetHeight;
	let button = document.querySelector<HTMLDivElement>(".page-button")!.offsetHeight;

	return window.innerHeight - (navbar + button);
});
</script>
<template>
	<div class="play-list-content">
		<!-- 加载 -->
		<div class="play-list-loading" v-if="!(isArray(songsArr) && songsArr!.length > 0)">
			<Loading color="var(--loading-color)" size="0.5rem"> 加载中... </Loading>
		</div>

		<div class="play-item" v-else>
			<VirtualList :data="songsArr" id="paly_list-details" :height="getContentHeight">
				<template v-slot:default="item">
					<van-cell>
						<template #title>
							<Ellipsis clamp="1" epsis>
								{{ item.value.name }}
							</Ellipsis>
						</template>
						<template #label>
							<Ellipsis clamp="1" epsis>
								{{ getLabel(item.value) }}
							</Ellipsis>
						</template>
					</van-cell>
				</template>
			</VirtualList>
		</div>
	</div>
</template>

<style lang="scss">
.play-list-content {
	margin-top: 100px;
	color: var(--font-main-color);
	.play-list-loading {
		text-align: center;
		width: 100%;
	}
	.play-item {
	}
}
</style>
