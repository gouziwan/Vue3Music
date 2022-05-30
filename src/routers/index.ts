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
			keep: true
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
	routes,
	scrollBehavior: (to, from) => {
		if (from.meta.keep) {
			from.meta.top = document.querySelector<HTMLDivElement>(".page-centent")!.offsetTop;
		}
	}
});

export const toRouterScroll = () => {
	const route = useRoute();
};

export default router;
