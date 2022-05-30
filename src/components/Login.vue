<script lang="ts" setup>
import { Popup, NavBar, Icon, Form, Field, Button, Toast, Cell } from "vant";
import { computed, ref, watchEffect } from "vue";
import { useStore } from "../state/popup";
import { useStore as userStore } from "../state/user";
import { userLogin } from "../Api/user/index";
import { throttle } from "../utils";
import { useLocalStorage } from "../utils/useLocalStorage";
import { userCookieName } from "../config/localStorage";

// 修改popup弹窗的
const state = useStore();
// 存放用户信息的
const userState = userStore();

const innerHeight = window.innerHeight;

const userName = ref("");

// 验证码跟密码公用一个变量
const password = ref("");

const userNameReg = /^(1[3456789])\d{9}$/;

const passwordReg = /.{5,18}/;

const storage = useLocalStorage();

const onClickLogin = () => {
	Toast.loading({
		message: "加载中...",
		forbidClick: true,
		duration: 0
	});
	// 节流防止用户多次点击
	throttle((happ: Function) => {
		userLogin(userName.value, password.value, res => {
			if (res.code !== 200) {
				Toast.fail(res.message || res.msg);
				return;
			} else {
				// 成功之后
				if (res.code == 200) {
					// 保存cookie
					storage[userCookieName] = res.cookie;
					// 保存用户信息
					userState.reviseUserInfo(res, true);
					// 提示信息
					Toast.success(`登录成功`);
					// 关闭弹窗
					state.reviseShowLogin(false);
				}
			}
		});
	}, 1000);
};

const isDisable = computed(() => {
	return userNameReg.test(userName.value) && passwordReg.test(password.value);
});

const onClickClearPopup = () => {
	state.reviseShowLogin(false);
	userName.value = "";
	password.value = "";
};
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
			</NavBar>

			<div class="login-icon">
				<Icon size="1.5rem" name="dogtubiao" class-prefix="dog"></Icon>
				<div class="login-icon-title">登录</div>
			</div>

			<div class="login-content">
				<Form @submit="onClickLogin">
					<Cell :border="false">
						<Field
							v-model="userName"
							name="手机号"
							label="手机号:"
							placeholder="手机号登录"
							:rules="[{ required: true, message: '请填写正确的手机号', pattern: userNameReg }]"
							label-align="right"
						/>
					</Cell>
					<Cell :border="false">
						<Field
							v-model="password"
							type="password"
							name="密码"
							label="密码:"
							placeholder="密码"
							:rules="[
								{ required: true, message: '请填写密码,不得少于5位到18位', pattern: passwordReg }
							]"
							label-align="right"
							:border="false"
						/>
					</Cell>
					<div style="margin: 20px 2rem">
						<Button round block plain type="primary" :disabled="!isDisable" native-type="submit">
							登录
						</Button>
					</div>
				</Form>
			</div>
		</div>
	</Popup>
</template>

<style lang="scss" scoped>
.login-popup-content {
	height: 100%;
	width: 100%;
	color: var(--font-main-color);
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

.login-icon {
	text-align: center;
	margin-top: 50px;
	color: var(--font-main-color-1);
	.login-icon-title {
		margin-top: 20px;
		font-size: 30px;
	}
}

.login-content {
	margin-top: 30px;
	.form-error {
		text-align: center;
		color: red;
	}
}

::v-deep .van-cell {
	.van-cell__value.authcode-value {
		flex: none;
		margin-right: 30px;

		.van-button--mini {
			padding: 30px 15px;
		}
	}
	background-color: transparent !important;
}

::v-deep .van-button--plain {
	background-color: transparent;
	border: solid 1px var(--border-color-1);
	color: var(--font-main-color);
}
</style>
