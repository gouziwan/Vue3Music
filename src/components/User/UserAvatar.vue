<script lang="ts" setup>
import { Image, Icon } from "vant";
import { useStore } from "../../state/user";
import { useStore as usePupop } from "../../state/popup";

const state = useStore();

const value = usePupop();

const onClickShowLogin = () => {
	// 如果为ture 就取消
	if (!state.isLogin) {
		value.reviseShowLogin(true);
	}
};
</script>
<template>
	<div class="user-avatar">
		<div class="user-avatar-content" @click="onClickShowLogin">
			<div class="user-avtar-img">
				<div class="user-avatar-default" v-if="!state.isLogin">
					<Icon name="dogwode-shixin_y_huaban" class-prefix="dog"></Icon>
				</div>
				<!-- 头像显示 -->
				<Image v-else :src="state.userAvtar" width="1.7rem" height="1.7rem" round></Image>
			</div>
			<div class="user-name">{{ state.userName }}<Icon name="arrow" v-if="!state.isLogin" /></div>
		</div>
	</div>
</template>

<style lang="scss">
.user-avatar {
	.user-avtar-img {
		.user-avatar-default {
			width: 1.7rem;
			height: 1.7rem;
			border-radius: 50%;
			background-color: rgb(198, 255, 191);
			position: relative;
			overflow: hidden;
			.dog-dogwode-shixin_y_huaban {
				font-size: 1.3rem;
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translate(-50%, 10%);
			}
		}
	}

	.user-name {
		font-size: 30px;
		margin-left: 20px;
	}

	padding: 20px;
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
