import { request } from "../api";

export const getPlaylistDetails = (id: any, callback: RequestCallBack) => {
	return request(`/playlist/detail?id=${id}`, callback);
};
