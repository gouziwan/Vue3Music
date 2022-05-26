import { NewDiscAreaType, NewDiscType } from "./../../enum/NewDisc";
import { request } from "../api";
import { NewCourierType, NewCourier } from "../../enum/NewCourier";

interface NewDiscParam {
	limit: number;
	offset: number;
	area: NewDiscAreaType;
	type: NewDiscType;
}

// 获取首页的轮播图
export function getBanner(callback?: RequestCallBack, type = 2) {
	return request(`/banner?type=${type}`, callback);
}

// 每日推荐歌曲
export function getRecommendedDaily(callback: RequestCallBack, limit: number = 100) {
	return request(`/personalized?limit=${limit}`, callback);
}

// 获取排行榜
export function getRankingList(callback: RequestCallBack) {
	return request(`/toplist`, callback);
}

// 获取排行榜的歌曲
export function getRankingListSong(id: string, callback?: RequestCallBack) {
	return request(`/playlist/detail?id=${id}`, callback);
}

// 获取新歌速递
export function getNewCourier(callback?: RequestCallBack, type: NewCourierType = "全部") {
	// @ts-expect-error
	return request(`/top/song?type=${NewCourier[type]}`, callback);
}

// 新碟上架
export function getNewDisc(
	callback?: RequestCallBack,
	pamar: NewDiscParam = { limit: 30, offset: 0, area: "全部", type: "全部" }
) {
	const { limit, offset, area, type } = pamar;

	return request(`/top/album?limit=${limit}&offset=${offset}&area=${area}&type=${type}`, callback);
}

export function getAlbum(callback?: RequestCallBack) {
	return request(`/album/newest`, callback);
}

// 获取话题详情
export function getTopic(callback?: RequestCallBack, offset: number = 0, limit: number = 6) {
	return request(`/hot/topic?offset=${offset}&limit=${limit}`, callback);
}

// 推荐 mv
export function getRecommendedMv(callback?: RequestCallBack) {
	return request(`/personalized/mv`, callback);
}
