<script lang="ts" setup>
import { Image, Icon } from "vant";
import { useStore } from "../../state/user";
import { useStore as usePupop } from "../../state/popup";

import { computed, defineProps, withDefaults } from "vue";

interface Props {
	width?: string;
	height?: string;
	IconSize?: string;
	contentClass?: string;
}

let props = withDefaults(defineProps<Props>(), {
	width: "1.7rem",
	height: "1.7rem",
	IconSize: "1.3rem",
	contentClass: ""
});

const state = useStore();

const value = usePupop();

const onClickShowLogin = () => {
	// 如果为ture 就取消
	if (!state.isLogin) {
		value.reviseShowLogin(true);
	}
};

const getStyleSize = computed(() => {
	return {
		width: props.width,
		height: props.height
	};
});

const getClassName = computed(() => {
	return ["user-avatar-content", props.contentClass];
});
</script>
<template>
	<div class="user-avatar">
		<div :class="getClassName" @click="onClickShowLogin">
			<div class="user-avtar-img">
				<div class="user-avatar-default" v-if="!state.isLogin" :style="getStyleSize">
					<Icon name="dogwode-shixin_y_huaban" class-prefix="dog" :size="props.IconSize"></Icon>
				</div>
				<!-- 头像显示 -->
				<Image
					v-else
					:src="state.userAvtar"
					:width="getStyleSize.width"
					:height="getStyleSize.height"
					round
				></Image>
			</div>
			<div class="user-name">{{ state.userName }}<Icon name="arrow" v-if="!state.isLogin" /></div>
		</div>
	</div>
</template>

<style lang="scss">
.user-avatar {
	.user-avtar-img {
		.user-avatar-default {
			border-radius: 50%;
			background-color: rgb(198, 255, 191);
			position: relative;
			overflow: hidden;
			color: #fff;
			.dog-dogwode-shixin_y_huaban {
				position: absolute;
				bottom: -10px;
				left: 50%;
				transform: translate(-50%, 10%);
			}
		}
	}

	.user-name {
		font-size: 30px;
		margin-left: 20px;
	}

	padding: var(--padding-size-medium);
	box-sizing: border-box;
	position: relative;

	.user-avatar-content {
		display: flex;
		align-items: center;
		background-color: var(--background-color-light);
		padding: 30px;
		border-radius: 15px;
	}
}
</style>
