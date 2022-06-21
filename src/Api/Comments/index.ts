import { CommentsValueType, SortValueType } from "../../enum/comments";
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
	const { id, type, pageNode = 1, pageSize = 20, sortType = 1, cursor } = data;

	return request(
		`/comment/new?type=${type}&id=${id}&pageNode=${pageNode}&pageSize=${pageSize}&sortType=${sortType}&cursor=${cursor}`,
		callback
	);
};
