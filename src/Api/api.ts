import axios, { AxiosRequestConfig } from "axios";
import { Toast } from "vant";
const ip = "10.52.2.247";

export const url = `http://${ip}:5000`;

const _request = axios.create({
	baseURL: url
});

_request.interceptors.response.use(
	response => response,
	error => {
		let messages = `请求出错`;
		if (error.response.status == "404") {
			Toast.fail(messages);
		}
		return {
			code: error.response.status,
			messages: messages
		};
	}
);

export const request = async function (
	config: AxiosRequestConfig | string,
	callback?: RequestCallBack
) {
	let res = await _request(config as AxiosRequestConfig);
	callback && callback(res.data, res);
	return res;
};
