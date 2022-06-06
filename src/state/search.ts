import { defineStore } from "pinia";
export const useSearchState = defineStore("serach", {
	state() {
		return {
			serach: ""
		};
	},

	actions: {
		// 设置搜索
		setSerach(value: any) {
			this.serach = value;
		}
	}
});
