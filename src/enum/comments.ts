export const enum CommentsValue {
	"歌曲" = 0,
	"mv" = 1,
	"歌单" = 2,
	"专辑" = 3,
	"电台" = 4,
	"视频" = 5,
	"动态" = 6
}

export type CommentsValueType = keyof typeof CommentsValue;

export const enum SortValue {
	"推荐" = 1,
	"最热" = 2,
	"最新" = 3
}

export type SortValueType = keyof typeof SortValue;
