export const SerachType = {
	单曲: 1,
	专辑: 10,
	歌手: 100,
	歌单: 1000,
	用户: 1002,
	MV: 1004,
	歌词: 1006,
	电台: 1009,
	视频: 1014,
	综合: 1018,
	声音: 2000
};

export type SerachTypeKeys = keyof typeof SerachType;
