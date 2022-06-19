import { userCookieName } from "./../../config/localStorage";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { request } from "../api";

// 获取歌单详情
export const getPlaylistDetails = (id: any, callback: RequestCallBack) => {
	const cookie = useLocalStorage()[userCookieName];

	return request(`/playlist/detail?id=${id}&cookie=${cookie}`, callback);
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
	cookie: string,
	callback: RequestCallBack
) => {
	let t = isConllection ? 1 : 2;
	return request(`/playlist/subscribe?t=${t}&id=${id}&cookie=${cookie}`, callback);
};

// 对歌单添加或者删除
export const upPlayListSongs = (
	op: "add" | "del",
	pid: any,
	tracks: any,
	callback?: RequestCallBack
) => {
	const cookie = useLocalStorage()[userCookieName];
	return request(
		{
			url: `/playlist/tracks?op=${op}&pid=${pid}&tracks=${tracks}&cookie=${cookie}`
		},
		callback
	);
};

// 获取专辑
export const getAlbumContent = (id?: string, callback?: RequestCallBack) => {
	return request(`/album?id=${id}`, callback);
};
