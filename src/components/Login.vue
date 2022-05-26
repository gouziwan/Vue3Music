<script lang="ts" setup>
import { Popup, NavBar, Icon } from "vant";
import { useStore } from "../state/popup";
const state = useStore();
// 获取高度
const innerHeight = window.innerHeight;

const onClickClearPopup = () => state.reviseShowLogin(false);
</script>
<template>
	<Popup v-model:show="state.isShowLogin" position="bottom">
		<div
			class="login-popup-content"
			:style="{
				height: innerHeight + 'px'
			}"
		>
			<NavBar :border="false">
				<template #left>
					<Icon
						name="dogshanchu"
						class-prefix="dog"
						color="var(--font-main-color)"
						size="20px"
						@click="onClickClearPopup"
					></Icon>
				</template>

				<template #right>
					<div class="login-right-nabar">短信登录</div>
				</template>
			</NavBar>
		</div>
	</Popup>
</template>

<style lang="scss" scoped>
.login-popup {
	height: 100%;
	width: 100%;
}

.van-popup {
	height: 100%;
}

.login-popup-content {
	background-color: var(--background-color-2);
}

::v-deep .van-nav-bar {
	background-color: transparent !important;
}

.login-right-nabar {
	color: var(--font-main-color);
	font-size: 25px;
}
</style>
