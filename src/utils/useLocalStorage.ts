import { isObject } from "@vue/shared";
import { reactive } from "vue";
import { isString } from ".";

interface LocalStorageType {
	[x: string]: any;
	getLocalStorage: () => LocalStorageType;
	remove: (key: string) => void;
}
// 这个key主要是保存 第一次进来的key 因为不  第一次对象不管嵌套多少层保存在地的还是第一个key
let currentkey: any = null;
//保存当前代理的对象
let currentlocalStorage: any;
// 这个保存的源对象 因为 localStorage保存的时候 如果是proxy对象的话会造成死循环
let source: any;

// 高阶函数
const useLocalStorage = (function () {
	source = getLocalStorage();
	// 这个代理主要是用于触发视图的更新的
	currentlocalStorage = reactive(source);
	// 这个代理是因为没办法改自能从中间再代理一层
	const rea = createProxy(currentlocalStorage);

	return function (): LocalStorageType {
		return rea;
	};
})();

function getLocalStorage() {
	let localStorage: LocalStorageType = {
		getLocalStorage,
		_isParent: true,
		remove
	};

	let _localStorage = window.localStorage;

	Object.keys(_localStorage).forEach(k => {
		// 判断是不是对象类型的字符串 如果是对象类型的 那他肯定 是”开头是[]结尾是 || {}“
		let req = /(^\[.+\]$)|(^\{.+\}$)/;

		let value = _localStorage[k];

		if (req.test(value)) {
			value = JSON.parse(value);
		}
		localStorage[k] = value;
	});

	return localStorage;
}

function createProxy(tagter: any): any {
	return new Proxy(tagter, {
		get(tag, key) {
			if (tag._isParent) {
				currentkey = key;
			}

			if (isObject(tag[key])) {
				return createProxy(tagter[key]);
			}

			return tag[key];
		},
		set(tag, key, value) {
			if (tag[key] === value) return true;

			Reflect.set(tag, key, value);

			let keys = currentkey === null ? key : currentkey;

			let val = source[keys];

			if (val != null || val != undefined) {
				if (isObject(val)) {
					val = JSON.stringify(val);
				}
				window.localStorage.setItem(keys, val);
			}

			return true;
		}
	});
}

function remove(keys: string | string[]) {
	if (isString(keys)) {
		keys = [keys as string];
	}

	for (let k = 0; k < keys.length; k++) {
		let key = keys[k];
		let boolean = Reflect.deleteProperty(currentlocalStorage, key);

		if (boolean) {
			window.localStorage.removeItem(key);
		}
	}
}

export { useLocalStorage };
