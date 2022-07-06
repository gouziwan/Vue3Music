import { defineStore } from "pinia";

export const useStore = defineStore("popup", {
	state: () => {
		return {
			isShowLogin: false,
			// 侧边栏
			sidebar: false,
			// 歌单
			songs: false,
			//歌单详情页
			audiosContent: false,
			// 视频播放页面
			videoContent: false
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
		},
		revieseAudiosContent(state: boolean) {
			this.audiosContent = state;
		},
		revieseVideoContent(state: boolean) {
			this.videoContent = state;
		}
	}
});
