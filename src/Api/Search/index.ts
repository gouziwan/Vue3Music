import { request } from "../api";

export function getTopSerach(callback: RequestCallBack) {
	return request(`/search/hot/detail`, callback);
}
