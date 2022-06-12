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
