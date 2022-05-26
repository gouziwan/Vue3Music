export const enum NewDiscArea {
	"全部" = "ALL",
	"华语" = "ZH",
	"欧美" = "EA",
	"韩国" = "KR",
	"日本" = "JP"
}

export type NewDiscAreaType = keyof typeof NewDiscArea;

export const enum NewDisc {
	"全部" = "new",
	"热门" = "hot"
}

export type NewDiscType = keyof typeof NewDisc;
