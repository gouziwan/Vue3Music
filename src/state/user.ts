import { defineStore } from "pinia";
import { useLocalStorage } from "../utils/useLocalStorage";
import { userCookieName } from "../config/localStorage";
import { getUserLoginState } from "../Api/user";
import { getAcquire, isObject } from "../utils";

export const useStore = defineStore("user", {
	state() {
		return {
			isLogin: false,
			userInfo: null,
			profile: null,
			// 喜欢的歌曲
			likeSongs: null,
			//创建的歌单
			createPlaylist: null,
			//收藏的歌单
			collectSongs: null
		};
	},
	actions: {
		// 修改 isLogin的状态
		reviseLoginState(state: boolean) {
			this.isLogin = state;
			// 重置为初始状态
			if (state === false) {
				// this.
			}
		},
		//修改userInfo
		reviseUserInfo(state: any, isLogin: boolean) {
			this.reviseLoginState(isLogin);
			this.userInfo = state;
			this.profile = state.profile;
		},
		reviseUserSongs(res: any[]) {
			res.forEach(el => {
				// 用户喜欢的歌单
				if (el.name === `${this.userName}喜欢的音乐` && el.userId === this.userId) {
					this.addLikeSons(el);
				} else if (el.userId === this.userId) {
					this.addcreatePlayList(el);
				} else {
					this.addCollectSons(el);
				}
			});
		},
		addLikeSons(res: any) {
			this.likeSongs === null ? (this.likeSongs = [res]) : this.likeSongs.push(res);
		},

		addcreatePlayList(res: any, position: "left" | "right" = "right") {
			if (this.createPlaylist === null) {
				this.createPlaylist = [res];
			} else {
				if (position === "right") {
					this.createPlaylist.push(res);
				} else {
					this.createPlaylist.unshift(res);
				}
			}
		},

		addCollectSons(res: any) {
			this.collectSongs === null ? (this.collectSongs = [res]) : this.collectSongs.push(res);
		},

		removeCreatePlayList(id: any) {
			for (let i = 0; i < this.createPlaylist.length; i++) {
				if (this.createPlaylist[i].id === id) {
					this.createPlaylist.splice(i, 1);
					return;
				}
			}
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
		},
		userId(state) {
			return isObject(state.profile) ? state.profile.userId : null;
		},
		// 获取喜欢歌曲的数量
		getLikeSongsCount(state) {
			return isObject(state.likeSongs) ? state.likeSongs[0].trackCount + "首" : "0首";
		},
		// 获取喜欢歌曲的图片
		getLikeSonsImag(state) {
			return isObject(state.likeSongs) ? getAcquire(state.likeSongs[0].coverImgUrl) : false;
		}
	}
});
