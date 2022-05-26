import { defineStore } from "pinia";

export const useStore = defineStore("user", {
	state: () => {
		return {
			isLogin: false,
			userInfo: null
		};
	},
	actions: {
		// 修改 isLogin的状态
		reviseLoginState(state: boolean) {
			this.isLogin = state;
		}
	}
});
