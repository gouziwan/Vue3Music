<script lang="ts" setup>
import { getComments, CommentsValue } from "../Api/Comments";
import PlayListHreadVue from "../components/PlayList/PlayListHread.vue";
import { commentsPara } from "../config/routerFrom";
const state = history.state;
const id = state[commentsPara.id];
const type = state[commentsPara.type];

function getCommentsValue(data: CommentsValue) {
	return getComments(
		{
			id,
			type,
			...data
		},
		res => {}
	);
}
</script>

<template>
	<div class="comments_page">
		<PlayListHreadVue title="评论" />

		<div class="comments_content"></div>
	</div>
</template>

<style lang="scss">
.comments_page {
	height: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	.comments_content {
		height: 100%;
	}
}
</style>
