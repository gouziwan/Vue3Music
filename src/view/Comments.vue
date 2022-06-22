<script lang="ts" setup>
import { computed, ref } from "vue";
import { getComments, CommentsValue, getCommentsGiveLike } from "../Api/Comments";
import PlayListHreadVue from "../components/PlayList/PlayListHread.vue";
import { commentsPara } from "../config/routerFrom";
import { List } from "vant";
import { getAncestorNodes, isArray } from "../utils";
import { SortValueType } from "../enum/comments";
import { useStore } from "../state/popup";
import { useStore as userState } from "../state/user";
const state = history.state;
const id = state[commentsPara.id];
const type = state[commentsPara.type];

const commentValue = ref<any>({});

const currentIndex = ref(0);

const popup = useStore();

const user = userState();

const finished = ref(false);

const tabs = ref([
	{
		title: "推荐"
	},
	{
		title: "最热"
	},
	{
		title: "最新"
	}
]);

const isLoading = ref(false);

function callback(res: any) {
	commentValue.value = res.data;
	isLoading.value = false;
}

function getCommentsValue(data: CommentsValue = {}, c: Function = callback) {
	return getComments(
		{
			id,
			type,
			...data
		},
		res => {
			if (res.code === 200) {
				if (!res.data.hasMore) return (finished.value = true);
				c(res);
			}
		}
	);
}

const onClickSwitch = (index: number) => {
	currentIndex.value = index;
	isLoading.value = true;
	commentValue.value = {};
	const t = tabs.value[index];
	getCommentsValue({ sortType: t.title as SortValueType });
};

function onLoad() {
	const index = currentIndex.value;
	const t = tabs.value[index];
	if (!isArray(commentValue.value.comments)) return;
	const len = commentValue.value.comments.length;
	getCommentsValue(
		{
			sortType: t.title as SortValueType,
			pageNode: Math.floor(commentValue.value.comments.length / 20) + 1,
			cursor: commentValue.value.comments[len - 1].time
		},
		(res: any) => {
			if (index === currentIndex.value) {
				commentValue.value.comments.push(...res.data.comments);
				isLoading.value = false;
			}
		}
	);
}

const onClickCommentsLike = (e: Event) => {
	e.preventDefault();

	let tagert = e.target as HTMLDivElement;

	tagert = getAncestorNodes(tagert, ".icon");

	if (!tagert) return;

	let cid = tagert.dataset.id;

	if (!id) return;

	if (!user.isLogin) return popup.reviseShowLogin(true);

	let values = commentValue.value.comments.filter((el: any) => el.commentId == cid)[0];

	getCommentsGiveLike(id, cid, values.like, "歌单", res => {
		if (res.code === 200) {
			values.like = !values.like;
			values.like === false ? values.likedCount-- : values.likedCount++;
		}
	});
};

const getIcon = (item: any) => {
	return item.like == true ? "dogdianzan1" : "dogdianzan";
};

const getColor = (item: any) => {
	return item.like == true ? "red" : "var(--font-main-color)";
};
// 初始化
getCommentsValue();
</script>

<template>
	<div class="comments_page">
		<PlayListHreadVue title="评论" />

		<div class="comments_content">
			<div class="comments_content_tabsl">
				<div class="left">评论区</div>
				<div class="right">
					<div
						class="item"
						v-for="(item, index) in tabs"
						:class="currentIndex === index ? 'active' : ''"
						@click="onClickSwitch(index)"
					>
						{{ item.title }}
					</div>
				</div>
			</div>

			<div class="comments_content_content" @click="onClickCommentsLike">
				<List
					v-model:loading="isLoading"
					@load="onLoad"
					:finished="finished"
					finished-text="没有更多了"
					offset="30"
				>
					<template v-if="isArray(commentValue.comments)">
						<div class="content_item" v-for="item in commentValue.comments">
							<div class="content_item_left">
								<van-image :src="item.user.avatarUrl" width="1rem" height="1rem" round></van-image>
							</div>
							<div class="content_item-right">
								<div class="right_top">
									<div class="title">
										<div class="right_name">
											{{ item.user.nickname }}
										</div>
										<div class="label">
											{{ item.timeStr }}
										</div>
									</div>
									<div class="icon" :data-id="item.commentId">
										<div class="likedCount">
											{{ item.likedCount }}
										</div>
										<van-icon
											:name="getIcon(item)"
											class-prefix="dog"
											size="0.4rem"
											:color="getColor(item)"
										/>
									</div>
								</div>
								<div class="right_bottom">
									<div class="content">
										{{ item.content }}
									</div>
									<div class="reply" v-if="item.replyCount > 0">
										{{ item.replyCount }}条回复<van-icon name="arrow" />
									</div>
								</div>
							</div>
						</div>
					</template>
				</List>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.comments_page {
	height: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	color: var(--font-main-color);
	.comments_content {
		overflow: hidden;
		height: 100%;
		flex-direction: column;
		flex: 1;
		display: flex;
		.comments_content_tabsl {
			padding: 20px;
			display: flex;
			font-size: 25px;
			.left {
				width: 100%;
				flex: 1;
			}
			.right {
				display: flex;
				.item {
					color: var(--font-main-color-2);
				}

				.item {
					padding: 0 10px;
					border-left: solid 1px rgb(46, 46, 46);
				}

				.item:nth-child(1) {
					border: none;
				}

				.item.active {
					color: var(--font-main-color);
				}
			}
		}

		.comments_content_content {
			padding: 0 20px;
			flex: 1;
			height: 100%;
			overflow: auto;
			.content_item {
				padding: 20px 0;
				width: 100%;
				display: flex;
				.content_item-right {
					width: 100%;
					.right_top {
						height: 1rem;
						display: flex;
						align-items: center;

						.icon {
							display: flex;
							align-items: center;
							.likedCount {
								margin-right: 10px;
								color: var(--font-main-color-2);
							}
						}

						.title {
							width: 100%;
							margin-left: 10px;
							flex: 1;
							.right_name {
								font-size: 25px;
							}

							.label {
								font-size: 20px;
								color: var(--font-main-color-2);
							}
						}
					}
					.right_bottom {
						margin: 10px 0 0px 10px;
						font-size: 25px;
						border-bottom: solid 1px var(--border-color-3);
						padding-bottom: 30px;
						text-align: justify;

						.reply {
							margin-top: 20px;
							color: rgb(127, 202, 255);
						}
					}
				}
			}
		}
	}
}
</style>
