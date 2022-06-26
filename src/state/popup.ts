import { defineStore } from "pinia";

export const useStore = defineStore("popup", {
	state: () => {
		return {
			isShowLogin: false,
			// 侧边栏
			sidebar: false,
			// 歌单
			songs: false
		};
	},
	actions: {
		// 修改 isLogin的状态
		reviseShowLogin(state: boolean) {
			this.isShowLogin = state;
		},
		// 修改侧边栏状态
		reviseShowSidebar(state: boolean) {
			this.sidebar = state;
		},
		reviseSongs(state: boolean) {
			this.songs = state;
		}
	}
});
