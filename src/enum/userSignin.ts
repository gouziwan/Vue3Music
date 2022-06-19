export const enum singin {
	"安卓" = 0,
	"web" = 1
}

export type SinginType = keyof typeof singin;
