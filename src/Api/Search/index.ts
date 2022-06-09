import { SerachTypeKeys, SerachType } from "../../enum/SerachType";
import { request } from "../api";

interface SearchParamType {
	keywored: string;
	type: SerachTypeKeys;
	limit?: number;
	offset?: number;
	callback?: RequestCallBack;
}

export function getTopSerach(callback?: RequestCallBack) {
	return request(`/search/hot/detail`, callback);
}

// 获取搜索建议
export function getSerachAdvice(keywords: string, callback?: RequestCallBack, type = "mobile") {
	return request(`/search/suggest?keywords=${keywords}&type=${type}`, callback);
}

// 获取搜索结果
export function getSearchResult({
	keywored,
	type,
	limit = 30,
	offset = 0,
	callback
}: SearchParamType) {
	let numstype = SerachType[type];
	return request(
		`/cloudsearch?keywords=${keywored}&limit=${limit}&offset=${offset}&type=${numstype}`,
		callback
	);
}
