type DayParmaType = Date | number | string;

class Day {
	tiem: Date = new Date();
	constructor(tiem?: DayParmaType) {
		this.init(tiem!);
	}

	init(tiem: DayParmaType) {
		if (tiem != undefined) {
			this.tiem = tiem instanceof Date ? tiem : new Date(Number(tiem));
		}
	}
	// 获取当前的天数
	getCurrentDay(suffix: string = "", prefix: string = "") {
		return prefix + this.tiem.getDate() + suffix;
	}
}

export default Day;
