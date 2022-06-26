import { request } from "../api";

// 获取歌单的url
export const getPlayUrl = (id: any, callback?: RequestCallBack) => {
	return request(`/song/url?id=${id}`, callback);
};
