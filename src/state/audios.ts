import { isArray, isObject, isString } from "../utils/index";
import { defineStore } from "pinia";
import { getPlayUrl } from "../Api/Audio";
import { Toast } from "vant";

export const audioStore = defineStore("audios", {
	state() {
		return {
			// 当前播放的音乐
			currentAudios: null as any,
			// 如果走这个重新添加肯定从第一首开始的
			currentIndex: 0,
			// 当前是否在播放状态
			playState: false,
			// 播放歌曲列表对象的形式 ->
			playList: [] as Array<any>,
			// 存储当前的 audio 对象 我们要对他进行操作
			audio: {} as HTMLAudioElement,
			duration: 0,
			currentTiem: 0,
			url: null,
			nums: 0,
			// 是否循环播放
			isLoopPlay: true
		};
	},
	actions: {
		//设置音频对象
		setAudioNode(audio: HTMLAudioElement) {
			this.audio = audio;
		},
		//set 当前播放的对象数据
		setCurrentAudios() {
			if (this.playList.length <= 0) return;
			const currentIndex = this.currentIndex >= this.playList.length ? 0 : this.currentIndex;
			// 当前的数据取出来
			this.currentAudios = this.playList[currentIndex];
			//这里主要是做一个 如果是循环播放的话 就 等于当前的 currentIndex就好
			this.currentIndex = this.isLoopPlay === false ? currentIndex : currentIndex + 1;
			// 获取当前歌曲的url 连接
			const uid = this.currentAudios.id;
			// 可能有的是缓存的有的不必要在重新请求过
			if (isString(this.currentAudios.playUrl)) {
				this.url = this.currentAudios.playUrl;
				this.onCanplay(this.switchPlay);
			} else {
				getPlayUrl(uid, res => {
					// 如果获取数据成功就执行播放是把
					// 歌曲加载成功
					if (res.code === 200) {
						if (isString(res.data[0].url)) {
							this.setCurrentAudiosInfo(res.data);
							this.onCanplay(this.switchPlay);
						} else if (res.data[0].url === "" && this.nums <= 20) {
							// 继续进行回调调用 this.setCurrentAudios 能播放为止
							Promise.resolve().then(() => this.setCurrentAudios());
							// 重试次数
							this.nums++;
						}
					}
				});
			}
		},

		setCurrentAudiosInfo(res: any) {
			this.currentAudios.playUrl = res[0].url;
			this.url = res[0].url;
		},

		// 播放音频对象
		switchPlay() {
			// 说明当前的视频可以播放
			if (this.audio.readyState === 4 || this.audio.readyState === 3) {
				// // 打开
				if (this.playState == false) {
					this.play();
					// 初始化数据
					this.init();
				} else {
					this.pause();
				}
				// 说明没有关于音频是否就绪的信息
			} else if (this.audio.readyState === 0) {
				if (isArray(this.playList) && this.playList.length > 0) {
					this.setCurrentAudios();
				} else {
					//空列表
					Toast.fail(`当前列表为空`);
				}
			}
		},

		play() {
			this.playState = true;
			// 播放视频
			this.audio.play();
			// 监听时长更新
			this.onEvent();
		},
		pause() {
			this.playState = false;
			// 关闭视频
			this.audio.pause();
			// 移除监听时长
			this.removerEvent();
		},

		// 监听音频对象的长度
		onEvent() {
			// 当前位置改变的时候触发
			this.audio.addEventListener("timeupdate", this.onTimeupDate);
			// 歌曲播放结束后触发
			this.audio.addEventListener("ended", this.onEnded);
		},

		init() {
			this.duration = this.audio.duration;
		},
		// 当播放位置改变的时候执行的事件
		onTimeupDate(e: any) {
			this.currentTiem = this.audio.currentTime;
		},

		//视频播放结束后触发
		onEnded() {
			this.pause();
			// 执行这个重新获取数据
			this.setCurrentAudios();
		},

		onCanplay(callback: Function) {
			Promise.resolve().then(() => {
				// ios ->需要重载视频才能执行 canplaythrough事件
				this.audio.load();
				this.audio.oncanplay = () => {
					console.log(1);
					callback();
					this.audio.oncanplay = null;
				};
			});
		},

		// 移除事件监听
		removerEvent() {
			this.audio.removeEventListener("timeupdate", this.onTimeupDate);
			this.audio.removeEventListener("ended", this.onEnded);
		},
		// 添加所有歌曲进歌单列表
		addAllPlay(arr: any) {
			this.currentIndex = 0;
			this.playList = arr;
			this.pause();
			this.setCurrentAudios();
		},

		// 添加单曲
		addSongsSingle(songs: any) {
			// 先判断当前播放的歌曲是否 等于当前id 不必重复添加
			if (isObject(this.currentAudios) && this.currentAudios.id === songs.id) return;
			// 再判断当前是否在播放歌曲如果在播放就往当前播放的后面插入否则就是往前插入
			const index = this.indexOf(this.currentAudios);
			if (isObject(this.currentAudios) && index != -1) {
				this.addAndPlay(index + 1, songs);
				return;
			}

			this.addAndPlay(0, songs);
		},
		indexOf(currentAudios: any) {
			let currentIndex = -1;
			if (!isObject(currentAudios)) return currentIndex;
			for (let i = 0; i < this.playList.length; i++) {
				const el = this.playList[i];
				if (el.id === currentAudios.id) {
					currentIndex = i;
					break;
				}
			}
			return currentIndex;
		},

		addAndPlay(index: number, item: any) {
			const i = this.indexOf(item);
			if (i === -1) {
				this.playList.splice(index, 0, item);
				this.currentIndex = index;
			} else {
				this.currentIndex = i;
			}
			this.pause();
			this.setCurrentAudios();
		},
		// 移除歌曲
		removePlay(songs: any) {
			// 移除歌曲肯定要先找到他在那里
			let currentIndex = this.indexOf(songs);

			if (currentIndex === -1) return;

			this.playList.splice(currentIndex, 1);

			if (songs.id === this.currentAudios.id) {
				// 如果他等于当前id 你需要把他给赋值
				this.pause();
				this.currentIndex--;
				this.setCurrentAudios();
			}
		},
		//重置所有歌曲
		reset() {
			this.pause();
			this.currentAudios = null;
			this.playList = [];
			this.url = null;
			this.currentIndex = 0;
			this.duration = 0;
			this.currentTiem = 0;
		}
	},
	getters: {
		getAudiosUrl(state) {
			return isString(state.url) ? state.url! : "";
		},

		getAudiosImage(state) {
			return isObject(state.currentAudios) ? state.currentAudios.al.picUrl : "";
		},

		getAudiosTitle(state) {
			return isObject(state.currentAudios) ? state.currentAudios.name : "";
		}
	}
});
