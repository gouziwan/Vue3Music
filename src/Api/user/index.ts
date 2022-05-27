import { request } from "../api";
// @ts-expect-error
import { hex_md5 } from "../../utils/md5.js";

export function userLogin(userName: any, password: any, callback?: RequestCallBack) {
	// 加密
	password = hex_md5(password);
	return request(`/login/cellphone?phone=${userName}&md5_password=${password}`, callback);
}

export function textLogin(userName: any, captcha: any, callback?: RequestCallBack) {
	return request(`/login/cellphone?phone=${userName}&captcha=${captcha}`, callback);
}
