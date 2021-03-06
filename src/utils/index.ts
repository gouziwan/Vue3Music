// 获取指定图片的质量 就是 宽度高度
export function getAcquire(src: string, str: string = "100y100") {
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

export function isString(value: any) {
	return typeof value === "string";
}

export function subArr(arr: any, len: number, total: number) {
	return arr.slice((len - 1) * total, len * total);
}

export function isObject(value: any) {
	return value instanceof Object;
}

export function isArray(value: any) {
	return Array.isArray(value);
}

// 获取当前节点 某个祖先节点 用于获取当前节点的
export function getAncestorNodes(target: HTMLDivElement, id: string) {
	if (target.id === id) return target;
	let parent = target.parentNode! as any;

	let name = id[0] === "#" ? "id" : "className";

	id = id.slice(1);

	while (parent[name] !== id && parent !== document.body) {
		parent = parent.parentNode! as HTMLDivElement;
	}

	if (parent === document.body) {
		return null;
	}

	return parent;
}

// 节流函数
export const throttle = (function () {
	let isexce = true;
	let id = null as any;
	let hanpp = (val: boolean) => (isexce = val);
	return function (callback: Function, tiem: number = 1000, ...arg: any) {
		if (isexce == true) {
			isexce = false;
			if (tiem !== 0) {
				id = setTimeout(() => hanpp(true), tiem);
			}
			callback && callback(hanpp, ...arg);
		}
		return id;
	};
})();

// 防止双击 屏幕放大

export function banDoubleClick() {
	window.onload = () => {
		let tiem = null as any;

		let isClick = false;

		document.addEventListener("touchend", (e: Event) => {
			if (isClick === true) {
				e.preventDefault();
			}
			clearTimeout(tiem);
			isClick = true;
			tiem = setTimeout(() => {
				isClick = false;
			}, 300);
		});
	};
}
// 防抖
export const antiShaking = (function () {
	let id = 0 as any;
	return function (_fn: Function, time: number = 500, ...arg: any[]) {
		clearTimeout(id);
		return (id = setTimeout(() => {
			_fn && _fn(...arg);
		}, time));
	};
})();

// 播放次数 把一个 12312313 -> 转成 1231万次
export function getPlayCountText(count: number, suffix: string = "万"): string {
	let value = count / 10000;

	if (value > 10000) {
		return getPlayCountText(value, "亿");
	} else if (value < 1) {
		return count + "";
	}

	return value.toFixed(1) + suffix;
}

export function upThemen(storage: any) {
	if (storage["themen"] == "block") {
		document.body.className = `${storage["themen"]}-themen`;
	}
}
