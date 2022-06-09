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
	let parent = target.parentNode! as HTMLDivElement;

	while (parent.id !== id && parent !== document.body) {
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
		let old = Date.now();

		document.addEventListener("touchend", (e: Event) => {
			let current = Date.now();

			if (current - old <= 300) {
				e.preventDefault();
				old = current;
				return;
			}
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
