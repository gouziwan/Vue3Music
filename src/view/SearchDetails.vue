<script lang="ts" setup name="SearchDetails">
import { onActivated, ref, nextTick } from "vue";
import { getSearchResult } from "../Api/Search";
import { keyw, serachKeyword, songsId } from "../config/routerFrom";
import { SerachTypeKeys } from "../enum/SerachType";
import Ellipsis from "../components/Ellipsis.vue";
import { Loading, List } from "vant";
import { getAcquire, getPlayCountText, isObject } from "../utils";
import Day from "../utils/Date";
import SongListDetails from "../components/SongListDetails.vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { audioStore } from "../state/audios";
const offsetTop = ref(0);

let current = ref(0);

let songsDetails = ref();

const router = useRouter();

// 显示的 歌曲详情的
const show = ref(false);

const keysword = ref(history.state[serachKeyword]);

let isUpdate = ref(false);

const audios = audioStore();

const tabsArr = ref<TabsType[]>([
	{
		title: "单曲",
		arr: [],
		max: 0,
		key: "songs",
		countkey: "songCount",
		name: "name",
		type: 1,
		isBorder: true,
		isLoading: false,
		click: (item: any) => {
			console.log(item);
		},
		offsetTop: 0
	},
	{
		title: "视频",
		arr: [],
		max: 0,
		key: "videos",
		countkey: "videoCount",
		name: "title",
		type: 2,
		url: "coverUrl",
		isShowRightIcon: true,
		isOmitTitle: true,
		cellCenter: true,
		imgSize: {
			width: "3.5rem",
			height: "2rem",
			radius: "0.3rem"
		},
		isLoading: false,
		imgdpi: "200y200",
		click: (item: any) => {
			console.log(item);
		},
		offsetTop: 0
	},
	{
		title: "歌单",
		arr: [],
		max: 0,
		key: "playlists",
		countkey: "playlistCount",
		name: "name",
		type: 3,
		url: "coverImgUrl",
		imgSize: {
			width: "1.5rem",
			height: "1.5rem",
			radius: "0.3rem"
		},
		isShowRightIcon: true,
		imgdpi: "100y100",
		isLoading: false,
		click: (item: any) => {
			router.push({
				name: "PlayListDetails",
				state: {
					[songsId]: item.id
				}
			});
		},
		offsetTop: 0
	},
	{
		title: "专辑",
		arr: [],
		max: 0,
		key: "albums",
		countkey: "albumCount",
		name: "name",
		type: 4,
		url: "blurPicUrl",
		imgSize: {
			width: "1.5rem",
			height: "1.5rem",
			radius: "0.3rem"
		},
		isShowRightIcon: true,
		imgdpi: "100y100",
		isLoading: false,
		click: (item: any) => {
			router.push({
				name: "PlayListDetails",
				state: {
					[songsId]: item.id,
					[keyw]: "专辑"
				}
			});
		},
		offsetTop: 0
	}
]);

const onRendered = (index: number, title: string) => {
	const { key, countkey } = tabsArr.value[index];

	getSearchResult({
		type: title as SerachTypeKeys,
		keywored: keysword.value,
		callback: res => {
			if (res.code === 200) {
				const data = res.result;
				tabsArr.value[index].arr = data[key];
				tabsArr.value[index].max = data[countkey];

				songsDetails.value = data[key][0];
			}
		}
	});

	if (title === "单曲") {
		cellTop();
	}
};

const getAuthorLabel = (item: any, tabs: TabsType) => {
	switch (tabs.type) {
		case 1:
			let str = isObject(item.al) && item.al.name ? item.al.name : "";
			return item.ar.map((el: any) => el.name).join() + "-" + str;
		case 2:
			return item.creator.map((el: any) => el.userName).join("/");
		case 3:
			return `${item.trackCount}首音乐 by-${item.creator.nickname} 播放${getPlayCountText(
				item.playCount
			)}`;

		case 4:
			return item.artist.name + new Day(item.publishTime).toString("yy-tt-mm");
	}
};

const getName = (item: any, name: string) => {
	return item[name];
};

const getImage = (item: any, tabs: TabsType) => {
	return getAcquire(item[tabs.url!], tabs.imgdpi!);
};

// 这个函数主要是解决 播放全部可以悬浮
function cellTop() {
	let buttonTop =
		offsetTop.value + document.querySelector<HTMLDivElement>(".van-tabs__wrap")!.offsetHeight;
	let node = document.querySelector("#serach-details-1");

	let button: HTMLDivElement;
	node!.addEventListener("scroll", e => {
		// 假如他不存在
		if (!button) {
			button = document.querySelector<HTMLDivElement>(".serach-cell-all")!;
		}
		if (node!.scrollTop > 0 && button.className == "serach-cell-all") {
			button.classList.add("fixed");
			button.style.top = buttonTop + "px";
		} else if (node!.scrollTop <= 0 && button.className == "serach-cell-all fixed") {
			button.classList.remove("fixed");
			button.style.top = "";
		}
	});
}

// 获取当前激活列表的条数
const onLoad = () => {
	const { key, title } = tabsArr.value[current.value];

	(function (index: number) {
		getSearchResult({
			type: title as SerachTypeKeys,
			keywored: keysword.value,
			callback: res => {
				if (res.code === 200) {
					const data = res.result;
					tabsArr.value[index].arr.push(...data[key]);
					tabsArr.value[index].isLoading = false;
				}
			}
		});
	})(current.value);
};

// 点击查看1歌曲详情
const onClickSongsDefault = (item: any) => {
	songsDetails.value = item;
	show.value = true;
};

onBeforeRouteLeave(to => {
	if (to.name !== "PlayListDetails") {
		isUpdate.value = true;
		tabsArr.value[current.value].offsetTop = 0;
		current.value = 0;
	} else {
		isUpdate.value = false;
		// 缓存当前的 offsetTop位置
		getNodeOffsetTop();
	}
});

onActivated(() => {
	if (offsetTop.value === 0) {
		offsetTop.value =
			document.querySelector<HTMLDivElement>(".serach-detail>.van-nav-bar")!.offsetHeight - 1;
	}

	if (isUpdate.value) {
		tabsArr.value.forEach(el => {
			el.arr = [];
			el.offsetTop = 0;
		});
		keysword.value = history.state[serachKeyword];
		onLoad();
		tabsArr.value[current.value].isLoading = true;
	}

	const top = tabsArr.value[current.value].offsetTop!;

	if (top != 0 && top != undefined) {
		nextTick(
			() =>
				(document.querySelector<HTMLDivElement>(`#serach-details-${current.value + 1}`)!.scrollTop =
					top)
		);
	}
});

function getNodeOffsetTop() {
	let node = document.querySelector<HTMLDivElement>(`#serach-details-${current.value + 1}`)!;
	tabsArr.value[current.value].offsetTop = node.scrollTop;
}

function onClickAllPlay() {
	audios.addAllPlay(tabsArr.value[0].arr);
}
</script>
<template>
	<div class="serach-details-content">
		<van-tabs
			background="var(--background-main-color)"
			title-inactive-color="var(--font-main-color-1)"
			title-active-color="var(--font-main-color)"
			@rendered="onRendered"
			sticky
			:offset-top="offsetTop"
			v-model:active="current"
		>
			<van-tab v-for="(item, index) in tabsArr" :title="item.title" :name="index">
				<div class="serach-details-tabs" :id="`serach-details-${index + 1}`">
					<List offset="50" @load="onLoad" v-model:loading="item.isLoading">
						<!-- 加载的自定义文案 -->
						<template #loading>
							<Loading color="#ee0a24" size="20px">加载中。。。</Loading>
						</template>

						<div class="serach-cell-all" v-show="item.arr.length > 0">
							<van-cell
								v-if="item.title === '单曲'"
								title="播放全部"
								center
								clickable
								@click="onClickAllPlay"
							>
								<template #icon>
									<div class="icon-music-o">
										<van-icon name="music-o" size="0.5rem" />
									</div>
								</template>
							</van-cell>
						</div>
						<van-cell
							clickable
							v-for="value in item.arr"
							:center="!item.cellCenter"
							:border="item.isBorder == true"
							@click="item.click(value)"
						>
							<template #title v-if="item.isOmitTitle">
								{{ getName(value, item.name) }}
							</template>
							<template #title v-else>
								<Ellipsis clamp="1" epsis>
									{{ getName(value, item.name) }}
								</Ellipsis>
							</template>

							<template #icon v-if="item.type == 2 || item.type == 3 || item.type == 4">
								<div style="margin-right: 10px">
									<van-image
										:src="getImage(value, item)"
										:width="item.imgSize!.width"
										:height="item.imgSize!.height"
										:radius="item.imgSize!.radius"
										fit="cover"
										lazy-load
									>
									</van-image>
								</div>
							</template>

							<template #label>
								<div class="serach-label">
									<Ellipsis clamp="1" epsis color="var(--font-main-color-3)">
										{{ getAuthorLabel(value, item) }}
									</Ellipsis>
								</div>
							</template>
							<template #right-icon v-if="!item.isShowRightIcon">
								<van-icon
									name="doggengduo"
									class-prefix="dog"
									size="0.5rem"
									@click="onClickSongsDefault(value)"
								/>
							</template>
						</van-cell>
					</List>
				</div>
			</van-tab>
		</van-tabs>
	</div>

	<!-- 弹出歌曲详情 -->
	<SongListDetails :item="songsDetails" v-model:show="show" />
</template>

<style lang="scss">
.serach-details-content {
	height: 100%;
	overflow: hidden;
	.icon-music-o {
		margin-right: 10px;
		display: flex;
		align-items: center;
	}

	.van-tabs {
		position: initial;
		height: 100%;
	}

	.van-tabs__content {
		height: 100%;

		& > * {
			height: 100%;
		}
	}

	.serach-details-tabs {
		height: calc(100% - 100px);
		overflow: auto;
		.van-cell::after {
			border-color: var(--border-color-2);
			width: calc(100% - var(--padding-size-medium) * 2);
			left: var(--padding-size-medium);
		}

		.van-cell {
			padding: var(--padding-size-medium);
		}

		.serach-label {
			font-size: 20px;
		}

		.serarch-loading {
			text-align: center;
			margin-top: 30px;
		}

		.serach-cell-all {
			position: relative;
			z-index: 2;
		}

		.serach-cell-all::after {
			position: absolute;
			box-sizing: border-box;
			content: " ";
			border-bottom: 2px solid var(--van-cell-border-color);
			bottom: 0;
			width: calc(100% - var(--van-padding-md));
			left: calc(var(--van-padding-md) / 2);
			pointer-events: none;
		}

		.serach-cell-all.fixed {
			position: fixed;
			width: 100%;
			z-index: 1;
			top: 100px;
			background-color: var(--background-main-color);
		}
	}
}
</style>
