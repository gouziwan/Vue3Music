import { defineStore } from "pinia";

export const useStore = defineStore("popup", {
	state: () => {
		return {
			isShowLogin: false,
			isAddSongs: false
		};
	},
	actions: {
		// 修改 isLogin的状态
		reviseShowLogin(state: boolean) {
			this.isShowLogin = state;
		},
		reviseIsAddSongs(state: boolean) {
			this.isAddSongs = state;
		}
	}
});
