import { defineStore } from "pinia";

export const cacheStore = defineStore("cache", {
	state() {
		return {
			keepHread: ["home-hread", "user-hread", "search-hread"],
			keepAlive: ["Home", "User", "songs-sing-catist", "Billboard", "Video", "SearchDetails"]
		};
	},
	actions: {
		// 添加缓存
		add(key: string) {
			this.keepAlive.push(key);
		},
		// 移除缓存
		remove(key: string) {
			let index = this.keepAlive.indexOf(key);

			if (index !== -1) {
				this.keepAlive.splice(index, 1);
			}
		}
	}
});
