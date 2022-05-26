export const enum NewCourier {
	"全部" = "0",
	"华语" = "7",
	"欧美" = "96",
	"日本" = "8",
	"韩国" = "16"
}

export type NewCourierType = keyof typeof NewCourier;
