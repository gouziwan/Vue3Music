import { userCookieName } from "./../../config/localStorage";
import {
	CommentsValue as CommentsValues,
	CommentsValueType,
	SortValueType,
	SortValue
} from "../../enum/comments";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { request } from "../api";

export interface CommentsValue {
	pageNode?: number;
	pageSize?: number;
	sortType?: SortValueType;
	cursor?: number;
}

export interface CommentsParameter {
	id: any;
	type: CommentsValueType;
	pageNode?: number;
	pageSize?: number;
	sortType?: SortValueType;
	cursor?: number;
}

// 获取评论资源
export const getComments = (data: CommentsParameter, callback: RequestCallBack) => {
	let { id, type, pageNode = 1, pageSize = 20, sortType = "推荐", cursor = Date.now() } = data;
	// @ts-ignore
	type = CommentsValues[type];
	// @ts-ignore
	sortType = SortValue[sortType];
	return request(
		`/comment/new?type=${type}&id=${id}&pageNode=${pageNode}&pageSize=${pageSize}&sortType=${sortType}&cursor=${cursor}`,
		callback
	);
};

// 给评论点赞
export const getCommentsGiveLike = (
	id: any,
	cid: any,
	t: any,
	type: CommentsValueType,
	callback?: RequestCallBack
) => {
	t = t == true ? 1 : 0;
	const cookie = useLocalStorage()[userCookieName];
	// @ts-ignore
	type = CommentsValues[type];
	return request(
		`/comment/like?id=${id}&cid=${cid}&t=${t}&type=${type}&cookie=${cookie}`,
		callback
	);
};
