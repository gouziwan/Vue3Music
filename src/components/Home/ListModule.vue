<script lang="ts" setup>
import { Button, Icon } from "vant";

const { title, buttonTxt } = defineProps({
	title: {
		type: String,
		default: "每日推荐"
	},
	buttonTxt: {
		type: String,
		default: "更多"
	},
	isShow: {
		type: Boolean,
		default: false
	},
	isButton: {
		type: Boolean,
		default: true
	}
});
</script>
<template>
	<div class="home-list-modules">
		<div class="home-list-items">
			<div class="items-title" v-show="isShow">
				<slot name="hread">
					<h2>{{ title }}</h2>
				</slot>
				<Button round size="mini" plain v-if="isButton"
					>{{ buttonTxt }} <Icon name="arrow" />
				</Button>
			</div>
			<div class="item-modules">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
::v-deep .van-button {
	background-color: transparent;
	color: var(--font-main-color);
}

.home-list-modules {
	color: var(--font-main-color);
	padding: 0 30px;
	margin-top: 20px;
	.items-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}
</style>
