import { request } from "../api";
// @ts-expect-error
import { hex_md5 } from "../../utils/md5.js";

// 用户登录
export function userLogin(userName: any, password: any, callback?: RequestCallBack) {
	// 加密
	password = hex_md5(password);
	return request(`/login/cellphone?phone=${userName}&md5_password=${password}`, callback);
}

// 刷新用户登录
export function getUserLoginState(cookie: any, callback?: RequestCallBack) {
	return request(`/login/status?cookie=${cookie}`, callback);
}

// 获取用户的歌单列表

export function getUserSongList(uid: any, callback?: RequestCallBack, offset: number = 0) {
	return request(`/user/playlist?uid=${uid}&offset=${offset}`, callback);
}
