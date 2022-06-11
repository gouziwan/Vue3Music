<script lang="ts" setup>
import { useLocalStorage } from "../../utils/useLocalStorage";
import { serachHistor } from "../../config/localStorage";
import { computed } from "vue";
import { isArray } from "../../utils";
import { Tag, Dialog } from "vant";
import { useRouter } from "vue-router";

const store = useLocalStorage();

const router = useRouter();

const serachRsult = computed(() => {
	return isArray(store[serachHistor]) && store[serachHistor].length > 0;
});

const onRemoveSearch = () => {
	Dialog.confirm({
		title: `提示`,
		message: "你确认清空聊天记录么?",
		theme: "default",
		width: "300px"
	}).then(() => {
		store[serachHistor] = [];
	});
};

const onClickSearchButtonTo = (item: string) =>
	router.push({
		path: "/searchdetails",
		state: {
			[serachHistor]: item
		}
	});
</script>
<template>
	<div class="serarch-history" v-if="serachRsult">
		<div class="history-title">历史</div>
		<div class="history-content">
			<div class="history-item" v-for="item in store[serachHistor]">
				<Tag round size="medium" @click="onClickSearchButtonTo(item)">
					{{ item }}
				</Tag>
			</div>
		</div>
		<div class="history-right" @click="onRemoveSearch">
			<van-icon name="delete-o" size="0.5rem" color="var(--font-main-color-1)" />
		</div>
	</div>
</template>

<style lang="scss">
.serarch-history {
	display: flex;
	align-items: center;
	margin-bottom: var(--margin-size-medium);
	.history-content {
		width: 100%;
		margin: 0 10px;
		overflow: auto;
		white-space: nowrap;
		flex: 1;
		display: flex;
		.history-item {
			margin-right: 10px;
		}

		&::-webkit-scrollbar {
			display: none;
		}
	}
	.history-title {
		font-size: 25px;
	}
}
.van-dialog.van-dialog--default {
	background-color: var(--background-color-1);
	color: var(--font-main-color);

	.van-hairline--top.van-dialog__footer::after {
		border-color: var(--border-color-2);
	}
	.van-button {
		background-color: var(--background-color-1);
		&::before,
		&::after {
			border-color: var(--border-color-2);
		}
		&.van-dialog__cancel {
			color: var(--font-main-color-1);
		}
	}
}
</style>
