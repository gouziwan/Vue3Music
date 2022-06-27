import { audioStore } from "../state/audios";

const audioState = audioStore();

// 添加单首歌曲进歌单
export function onClickPlayCurrent(songs: any) {
	audioState.addSongsSingle(songs);
}

export const isPlaySongs = (item: any) => {
	if (audioState.currentAudios == null) return false;
	return item.id === audioState.currentAudios.id;
};

// 点击添加所有歌曲进入所有歌单
export const onClickAllPlay = (songsArr: any) => audioState.addAllPlay(songsArr);
