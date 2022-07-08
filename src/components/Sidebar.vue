<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "../state/popup";
import UserAvatarVue from "./User/UserAvatar.vue";
import { Button, Switch } from "vant";
import { useStore as userStore } from "../state/user";
import { userSignin } from "../Api/user";
import { useLocalStorage } from "../utils/useLocalStorage";
import { userCookieName } from "../config/localStorage";
const usePopup = useStore();

const userState = userStore();

const storage = useLocalStorage();

const getStyle = computed(() => {
	return {
		height: window.innerHeight + "px"
	};
});

const active = ref(storage["themen"] == "block" ? true : false);

const isSignin = ref(false);

const signinText = computed(() => {
	return isSignin.value === false ? "签到" : "已签到";
});

const onClickUserSignin = () => {
	userSignin(res => {
		if (res.code === 200) {
			isSignin.value = true;
		}
	});
};

const onClickLogOut = () => {
	storage.remove(userCookieName);
	userState.$reset();
};

const grouping: GroupingType = {
	user: {
		title: "用户",
		arr: [
			{
				icon: "dogxiaoxizhongxin",
				title: "消息中心"
			},
			{
				icon: "dogweibiaoti--",
				title: "我的好友"
			}
		]
	},
	settings: {
		title: "设置",
		arr: [
			{
				icon: "dogdark",
				title: "深色模式",
				right: true
			},

			{
				icon: "dogicon-",
				title: "个性皮肤"
			},
			{
				icon: "dogshezhi",
				title: "设置"
			}
		]
	}
};

const onChange = (value: Boolean) => {
	let body = document.body;
	let className = value ? "block" : "white";
	body.className = `${className}-themen`;
	storage["themen"] = className;
};
</script>
<template>
	<van-popup v-model:show="usePopup.sidebar" position="left">
		<div class="sidebar-content" :style="getStyle">
			<div class="sidebar-hread">
				<UserAvatarVue
					content-class="avatar"
					width="1rem"
					height="1rem"
					IconSize="0.8rem"
				></UserAvatarVue>
			</div>
			<div class="user_signin" v-if="userState.isLogin">
				<Button round size="small" @click="onClickUserSignin" :disabled="isSignin">
					{{ signinText }}
				</Button>
			</div>
			<div class="content-cell">
				<div class="cell-item" v-for="value in grouping">
					<van-cell-group inset :title="value.title">
						<van-cell v-for="item in value.arr" :is-link="!item.right" clickable>
							<template #icon>
								<van-icon :name="item.icon" class-prefix="dog" size="0.5rem"></van-icon>
							</template>
							<template #title>
								<div class="title">
									{{ item.title }}
								</div>
							</template>

							<template #right-icon v-if="item.right">
								<Switch
									size="0.45rem"
									v-model="active"
									active-color="var(--tabbar-active-color)"
									@change="onChange"
								></Switch>
							</template>
						</van-cell>
					</van-cell-group>
				</div>

				<div class="ccontent-button" v-if="userState.isLogin">
					<Button round @click="onClickLogOut">退出登录</Button>
				</div>
			</div>
		</div>
	</van-popup>
</template>

<style lang="scss" scoped>
.sidebar-content {
	display: block;
	color: var(--font-main-color);
	height: 100%;
	background-color: var(--background-main-color);
	width: 650px;

	.sidebar-hread {
		.image {
			width: 1rem;
			height: 1rem;
			border-radius: 50%;
		}

		::v-deep(.user-avatar-content.avatar) {
			padding: 0;
			background-color: transparent;
		}
	}

	.content-cell {
		.cell-item {
			::v-deep(.van-badge__wrapper) {
				margin: 0 20px;
			}
			::v-deep(.van-cell-group) {
				background-color: var(--background-color-1);
			}
			::v-deep(.van-cell-group__title--inset) {
				padding: var(--van-cell-group-inset-padding);
				margin: 30px 0;
			}
		}
	}

	.ccontent-button {
		margin-top: 30px;
		text-align: center;
		.van-button {
			padding: 20px 0;
			width: calc(100% - 75px);
			background-color: var(--background-color-1);
			color: var(--font-main-color);
			border: none;
			color: red;
		}
	}

	.user_signin {
		text-align: center;
		margin: 20px 0;
		.van-button {
			width: 200px;
			padding: 10px 0;
			border: none;
			color: var(--font-main-color);
			background-color: var(--background-color-1);
		}
	}
}
</style>
