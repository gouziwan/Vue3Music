export const enum GiveSelect {
	"点赞" = 1,
	"取消点赞" = 2
}

export type GiveSelectType = keyof typeof GiveSelect;

export const enum GiveResources {
	"mv" = 1,
	"电台" = 4,
	"视频" = 5,
	"动态" = 6
}

export type GiveResourcesType = keyof typeof GiveResources;
