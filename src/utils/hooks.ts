import { reactive } from "vue";

interface LocalStorageType {
	[x: string]: any;
	getLocalStorage: () => LocalStorageType;
}

// 高阶函数
const useLocalStorage = (function () {
	let localStorage = createProxy(getLocalStorage());

	return function () {
		return localStorage;
	};
})();

function getLocalStorage() {
	let localStorage: LocalStorageType = {
		getLocalStorage
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

function createProxy(tagter: any) {
	return new Proxy(tagter, {
		get(tagter, key) {
			console.log(tagter, key);
			return tagter[key];
		},
		set(tagter, key, value) {
			tagter[key] = value;
			return false;
		}
	});
}

export { useLocalStorage };
