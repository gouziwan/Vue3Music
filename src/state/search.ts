import { defineStore } from "pinia";
import { isArray } from "../utils";

interface SearchStateType {
	serach: string;
	serachResult: Array<any> | null;
}

export const useSearchState = defineStore("serach", {
	state() {
		return {
			serach: "",
			serachResult: null as Array<any> | null
		};
	},

	actions: {
		// 设置搜索
		setSerach(value: any) {
			this.serach = value;
		},
		setSerachResult(value: any[] | null) {
			this.serachResult = value;
		}
	},
	getters: {
		isSerachResult: (state: SearchStateType) => {
			return isArray(state.serachResult);
		}
	}
});
