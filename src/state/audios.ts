import { defineStore } from "pinia";

export const audioStore = defineStore("audios", {
	state() {
		return {
			// 当前播放的音乐
			currentAudios: "",
			// 当前是否在播放状态
			playState: false,
			// 播放歌曲列表对象的形式 ->
			playList: [],
			// 存储当前的 audio 对象 我们要对他进行操作
			audio: {} as HTMLAudioElement
		};
	},
	actions: {
		//设置音频对象
		setAudioNode(audio: HTMLAudioElement) {
			this.audio = audio;
		},
		// 播放音频对象
		switchPlay() {
			// 打开
			if (this.playState == false) {
				this.playState = true;
				this.audio.play();
			} else {
				this.playState = false;
				this.audio.pause();
			}
		}
	},
	getters: {}
});
