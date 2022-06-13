import { request } from "../api";

// 获取歌单详情
export const getPlaylistDetails = (id: any, callback: RequestCallBack) => {
	return request(`/playlist/detail?id=${id}`, callback);
};

// 获取歌单里面歌曲详情
export const getPlaySongsDetails = (arr: any, callback: RequestCallBack) => {
	let id = arr.map((el: any) => el.id).join(",");
	return request(`/song/detail?ids=${id}`, callback);
};

// 搜藏当前歌单 true 为收藏 false为取消
export const collectionPlaySongs = (
	id: string,
	isConllection: Boolean,
	callback: RequestCallBack
) => {
	let t = isConllection ? 1 : 2;
	return request(`/playlist/subscribe?t=${t}&id=${id}`, callback);
};
