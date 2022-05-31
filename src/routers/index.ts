import { isObject } from "../utils/index";
import { createRouter, createWebHistory, RouteRecordRaw, useRoute } from "vue-router";

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
			keep: true,
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
			keep: false
		},
		name: "User"
	}
];

// 创建路由
const router = createRouter({
	history: createWebHistory(),
	routes
});

export const toRouterScroll = () => {
	const route = useRoute();
	let r = routes.filter(el => el.name === route.name)[0];
	// 如果他等0也没必要设置
	if (isObject(r.meta) && r.meta!.top != undefined) {
		const { top } = r.meta! as any;
		Promise.resolve().then(() => (document.querySelector(".page-centent")!.scrollTop = top));
	}
};

export const upRouterScroll = (to: any, from: any) => {
	let name = from.name;
	let r = routes.filter(el => el.name === name)[0];
	if (isObject(r.meta)) {
		r.meta!.top = document.querySelector<HTMLDivElement>(".page-centent")!.scrollTop;
	}
};

export default router;
