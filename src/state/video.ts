import { defineStore } from "pinia";

export const videoState = defineStore("video", {
	state() {
		return {
			currentVideo: undefined as any
		};
	},
	actions: {
		addVideo(state: any) {
			this.currentVideo = state;
		}
	}
});
