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

	// 获取年
	getYears(suffix: string = "", prefix: string = "") {
		return prefix + this.tiem.getFullYear() + suffix;
	}

	// 获取月
	getMonth(suffix: string = "", prefix: string = "") {
		return prefix + this.tiem.getMonth() + suffix;
	}

	// 格式必须 是 yy-mm-tt-ss-ff-ii  对应的格式 是-> 年-月-日-时-分-秒
	toString(format: string, join: string = "-") {
		let formatArr = format.split("-");

		let data = {
			yy: this.getYears,
			mm: this.getMonth,
			tt: this.getCurrentDay
		};
		return formatArr.map(k => data[k as keyof typeof data].call(this)).join(join);
	}

	// 把当前的number 转化为 -> 0:00格式
	conversionTiem(n: number) {
		let r = Math.floor(n / 60);
		let t = parseInt(n - r * 60 + "");
		return `${r}:${t * 1 < 10 ? "0" + t : t}`;
	}

	// 把 0:00 -> 转换为 100这种格式
	static geleTiem(tiem: string) {
		let [points, seconds] = tiem.split(":");
		return parseInt(points, 10) * 60 + parseFloat(seconds);
	}
}

export default Day;
