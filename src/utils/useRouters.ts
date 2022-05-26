import { useRouter, useRoute } from "vue-router";

function useRouters() {
	return {
		...useRoute(),
		...useRouter()
	};
}

export default useRouters;
