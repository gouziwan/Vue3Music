import axios, { AxiosRequestConfig } from "axios";

const ip = "10.52.4.228";

export const url = `http://${ip}:5000`;

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
