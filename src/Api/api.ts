import { isObject } from "../utils";
import axios, { AxiosRequestConfig } from "axios";
import { Toast } from "vant";
const ip = "10.52.7.121";

export const url = `http://${ip}:5000`;

const _request = axios.create({
	baseURL: url
});

_request.interceptors.response.use(
	response => {
		Toast.clear();
		if (response.data.code < 200 || response.data.code > 299) {
			Toast.fail(response.data.message || response.data.msg);
		}
		return response;
	},
	error => {
		let messages = isObject(error.response.data)
			? error.response.data.msg || error.response.data.messages || `请求出错`
			: `请求出错`;

		Toast.fail(messages);

		return {
			code: error.response.status,
			messages: messages
		};
	}
);

export const request = async function (
	config: AxiosRequestConfig | string,
	callback?: RequestCallBack
): Promise<any> {
	let res = await _request(config as AxiosRequestConfig);
	callback && callback(res.data, res);
	return res;
};
