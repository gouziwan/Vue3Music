import { request } from "../api";
// @ts-expect-error
import { hex_md5 } from "../../utils/md5.js";
import { isArray } from "../../utils";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { userCookieName } from "../../config/localStorage";

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

// 删除用户歌单
export function deleteUserSongs(arr: any, callback?: RequestCallBack) {
	if (!isArray(arr)) arr = [arr] as any[];
	arr = arr.join(",");
	let cookie = useLocalStorage()[userCookieName];
	return request(`/playlist/delete?id=${arr}&cookie=${cookie}`, callback);
}

// 添加用户歌单
export function addUserSongs(name: string, callback?: RequestCallBack) {
	let cookie = useLocalStorage()[userCookieName];
	return request(`/playlist/create?name=${name}&cookie=${cookie}`, callback);
}
