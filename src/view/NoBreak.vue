<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { getRecommendSongs } from "../Api/NoBreak";
import PlayListHreadVue from "../components/PlayList/PlayListHread.vue";
import { useStore } from "../state/user";
import { Loading } from "vant";
import Ellipsis from "../components/Ellipsis.vue";
import { getAcquire } from "../utils/index";
import SongListDetails from "../components/SongListDetails.vue";
import { useStore as usePopup } from "../state/popup";
// import { onClickPlayCurrent, isPlaySongs, onClickAllPlay } from "../minxins/audio";
import { audioStore } from "../state/audios";

const user = useStore();

const value = ref<any[]>([]);

const popup = usePopup();

const audioState = audioStore();

// 添加单首歌曲进歌单
function onClickPlayCurrent(songs: any) {
	audioState.addSongsSingle(songs);
}

const isPlaySongs = (item: any) => {
	if (audioState.currentAudios == null) return false;
	return item.id === audioState.currentAudios.id;
};

// 点击添加所有歌曲进入所有歌单
const onClickAllPlay = (songsArr: any) => audioState.addAllPlay(songsArr);

watchEffect(() => {
	if (user.isLogin && value.value.length <= 0) {
		getRecommendSongs(res => {
			if (res.code == 200) {
				value.value.push(...res.data.dailySongs);
			}
		});
	} else if (!user.isLogin) {
		value.value = [];
	}
});

const show = ref(false);

const currentItem = ref(undefined);

const getAvatar = (item: any) => {
	return item.ar.map((el: any) => el.name).join("/") + "-" + item.al.name;
};

const onClickShowCurrentSongsDetails = (item: any, e: Event) => {
	e.stopPropagation();
	currentItem.value = item;
	show.value = true;
};

const onClickLogin = () => popup.reviseShowLogin(true);
</script>
<template>
	<div class="no_break">
		<PlayListHreadVue title="每日推荐" />
		<template v-if="user.isLogin">
			<div class="no_break_content" v-if="value.length > 0">
				<div class="button">
					<van-cell title="全部播放" @click="onClickAllPlay(value)">
						<template #icon>
							<div class="icon">
								<van-icon name="dogbofang1" class-prefix="dog" size="0.4rem"></van-icon>
							</div>
						</template>
					</van-cell>
				</div>

				<div class="cotent">
					<van-cell v-for="item in value" :border="false" center @click="onClickPlayCurrent(item)">
						<template #icon>
							<div class="images">
								<van-image
									:src="getAcquire(item.al.picUrl, '100y100')"
									width="1rem"
									height="1rem"
									radius="0.1rem"
								></van-image>
							</div>
						</template>

						<template #title>
							<Ellipsis
								clamp="1"
								epsis
								:color="isPlaySongs(item) ? 'red' : 'var(--font-main-color)'"
							>
								{{ item.name }}
							</Ellipsis>
						</template>

						<template #label>
							<Ellipsis clamp="1" epsis color="var(--font-main-color-2)">
								{{ getAvatar(item) }}
							</Ellipsis>
						</template>

						<template #right-icon>
							<van-icon
								name="doggengduo"
								class-prefix="dog"
								size="0.5rem"
								@click="onClickShowCurrentSongsDetails(item, $event)"
							></van-icon>
						</template>
					</van-cell>
				</div>
			</div>

			<div class="" v-else>
				<div class="loading">
					<Loading size="20px">加载中</Loading>
				</div>
			</div>
		</template>

		<template v-else>
			<div class="no_bareak-e">
				<van-button plain type="primary" size="small" round @click="onClickLogin">
					请先登录
				</van-button>
			</div>
		</template>
	</div>

	<SongListDetails :item="currentItem" v-model:show="show"></SongListDetails>
</template>

<style lang="scss">
.no_break {
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;

	.no_break_content {
		height: 100%;
		overflow: hidden;
		flex: 1;
		flex-direction: column;
		display: flex;

		.button {
			border-bottom: solid 1px var(--border-color-3);
		}

		.icon {
			margin-right: 20px;
		}
	}

	.loading {
		text-align: center;
		margin-top: 30px;
	}

	.no_bareak-e {
		display: flex;
		justify-content: center;
		margin-top: 100px;
		.van-button {
			background-color: transparent;
		}

		.van-button--primary {
			border-color: var(--border-color-1);
			color: var(--font-main-color);
			padding: 30px 70px;
		}
	}

	.cotent {
		height: 100%;
		overflow: auto;
		flex: 1;
		.images {
			margin-right: 20px;
		}
	}
}
</style>
