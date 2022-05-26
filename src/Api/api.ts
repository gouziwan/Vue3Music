import axios, { AxiosRequestConfig } from "axios";

export const url = "http://10.62.48.202:5000";

const _request = axios.create({
	baseURL: url
});

export const request = async function (
	config: AxiosRequestConfig | string,
	callback?: RequestCallBack
) {
	let res = await _request(config as AxiosRequestConfig);
	callback && callback(res.data, res);
	return res;
};
