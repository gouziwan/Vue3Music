import { defineStore } from "pinia";

export const useStore = defineStore("popup", {
	state: () => {
		return {
			isShowLogin: true
		};
	},
	actions: {
		// 修改 isLogin的状态
		reviseShowLogin(state: boolean) {
			this.isShowLogin = state;
		}
	}
});
