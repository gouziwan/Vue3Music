import { getTouristsCookies } from "../user";
import { request } from "./../api";

let touristsCookie: any = null;

type CookieCallback = (cookie: string) => Promise<any>;

type PathStrinFunction = (cookie: string) => string;

type ExecPromise = (resolve: (value: any) => void) => void;

function createFunction(fn: PathStrinFunction, callback?: RequestCallBack) {
	return new Promise(async resolve => {
		let value = null;

		value =
			touristsCookie === null
				? await getCookie(cookie => request(fn(cookie), callback))
				: await request(fn(touristsCookie), callback);

		resolve(value);
	});
}

// 请求cookie逻辑
function getCookie(callback: CookieCallback) {
	return new Promise(async resolve => {
		let res = await getTouristsCookies();
		if (res.data.code === 200) {
			let cookie = res.data.cookie;
			// 保存这个cookie下次避免再次请求
			touristsCookie = cookie;
			let videoValue = await callback(cookie);
			resolve(videoValue);
		} else {
			resolve({ code: 400, messages: "请求失败" });
		}
	});
}

function execPromise(callback: ExecPromise) {
	return new Promise(resolve => callback(resolve));
}

// 获取视频分类
export const getVideoClassify = (callback?: RequestCallBack) =>
	execPromise(async resolve =>
		resolve(await createFunction(cookie => `/video/category/list?cookie=${cookie}`, callback))
	);

// 获取分类下的视频
export const getVideoDefault = (id?: string | number, offset = 0, callback?: RequestCallBack) =>
	execPromise(async resolve =>
		resolve(
			await createFunction(
				cookie => `/video/group?id=${id}&offset=${offset}&cookie=${cookie}`,
				callback
			)
		)
	);
