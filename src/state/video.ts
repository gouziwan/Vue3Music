import { defineStore } from "pinia";

export const videoState = defineStore("video", {
	state() {
		return {
			currentVideo: undefined as any,
			cache: {} as { [x: string]: any }
		};
	},
	actions: {
		addVideo(state: any) {
			this.currentVideo = state;
		},
		cacheUrl(id: number, url: string) {
			this.cache[id] = url;
		},

		getCacheId(id: number) {
			return this.cache[id];
		}
	}
});
