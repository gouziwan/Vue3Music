import { request } from "../api";

// 获取歌单分类
export const getCatlist = (callback: RequestCallBack) => {
	return request(`/playlist/catlist`, callback);
};

// 获取热门歌单分类
export const getHotCatilst = (callback: RequestCallBack) => {
	return request(`/playlist/hot`, callback);
};
// 获取精品歌单

export const getBoutiquePlaylist = (
	cat: any,
	limit: number = 30,
	offset: number,
	callback: RequestCallBack
) => {
	return request(`/top/playlist?offset=${offset}&limit=${limit}&cat=${cat}`, callback);
};
