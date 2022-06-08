import { request } from "../api";

export function getTopSerach(callback?: RequestCallBack) {
	return request(`/search/hot/detail`, callback);
}

// 获取搜索建议
export function getSerachAdvice(keywords: string, callback?: RequestCallBack, type = "mobile") {
	return request(`/search/suggest?keywords=${keywords}&type=${type}`, callback);
}
