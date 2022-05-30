import { defineStore } from "pinia";
import { useLocalStorage } from "../utils/useLocalStorage";
import { userCookieName } from "../config/localStorage";
import { getUserLoginState } from "../Api/user";
import { isObject } from "../utils";
export const useStore = defineStore("user", {
	state() {
		return {
			isLogin: false,
			userInfo: null,
			profile: null
		};
	},
	actions: {
		// 修改 isLogin的状态
		reviseLoginState(state: boolean) {
			this.isLogin = state;
		},
		//修改userInfo
		reviseUserInfo(state: any, isLogin: boolean) {
			this.reviseLoginState(isLogin);
			this.userInfo = state;
			this.profile = state.profile;
		},
		// 初始化登录
		initLogin() {
			let state = useLocalStorage();
			// 如果他的没有那就是
			let name = state[userCookieName];

			if (name) {
				getUserLoginState(name, res => {
					if (res.data.code === 200) {
						this.reviseUserInfo(res.data, true);
					}
				});
			}
		}
	},
	getters: {
		userAvtar(state: any) {
			return state.profile ? state.profile.avatarUrl : null;
		},
		userName(state) {
			return isObject(state.profile) ? state.profile.nickname : "立即登录";
		}
	}
});
