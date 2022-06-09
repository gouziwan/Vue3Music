import { isObject } from "../utils/index";
import {
	createRouter,
	createWebHashHistory,
	createWebHistory,
	RouteRecordRaw,
	useRoute
} from "vue-router";
import { serachKeyword } from "../config/routerFrom";

// 路由
const routes: RouteRecordRaw[] = [
	{
		// 路径
		path: "/",
		// 组件
		components: {
			default: () => import("../view/Home.vue"),
			hread: () => import("../components/Home/HomeHread.vue")
		},
		meta: {
			top: 0
		},
		name: "Home"
	},
	{
		path: "/user",
		components: {
			default: () => import("../view/User.vue"),
			hread: () => import("../components/User/UserHread.vue")
		},
		meta: {
			top: 0
		},
		name: "User"
	},
	{
		path: "/search",
		components: {
			hread: () => import("../components/Search/SearchHread.vue"),
			default: () => import("../view/Search.vue")
		},
		name: "Search"
	},
	{
		path: `/searchdetails`,
		components: {
			hread: () => import("../components/SearchDetails/Hread.vue"),
			default: () => import("../view/SearchDetails.vue")
		},
		name: "SearchDeails"
	}
];

// 创建路由
const router = createRouter({
	history: createWebHistory(),
	routes
});

console.log(createWebHashHistory());

// 这个是获取对应dom的top
export const toRouterScroll = (dom = document.querySelector(".page-centent")!) => {
	const route = useRoute();
	let r = routes.filter(el => el.name === route.name)[0];
	// 如果他等0也没必要设置
	if (isObject(r.meta) && r.meta!.top != undefined) {
		const { top } = r.meta! as any;
		Promise.resolve().then(() => (dom.scrollTop = top));
	}
};

// 组件离开的时候缓存当前位置
export const upRouterScroll = (to: any, from: any) => {
	let name = from.name;
	let r = routes.filter(el => el.name === name)[0];
	if (isObject(r.meta)) {
		r.meta!.top = document.querySelector<HTMLDivElement>(".page-centent")!.scrollTop;
	}
};

export default router;
