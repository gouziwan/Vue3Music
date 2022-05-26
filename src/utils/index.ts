// 获取指定图片的质量 就是 宽度高度
export function getAcquire(src: string, str: string = "300y300") {
	return (src += `?param=${str}`);
}

// 获取数组中的随机元素

export function getArrRoundValue(arr: any[], nums: number) {
	if (nums > arr.length) return arr;

	arr = JSON.parse(JSON.stringify(arr));

	let res = [];

	for (let i = 0; i < nums; i++) {
		let rund = Math.floor(Math.random() * arr.length);
		res.push(...arr.splice(rund, 1));
	}

	return res;
}

export function subArr(arr: any, len: number, total: number) {
	return arr.slice((len - 1) * total, len * total);
}
