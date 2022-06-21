import { isObject } from "../utils/index";
import {
	createRouter,
	createWebHashHistory,
	createWebHistory,
	RouteRecordRaw,
	useRoute
} from "vue-router";

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
		path: "/PlayList",
		components: {
			default: () => import("../view/PlayList.vue"),
			hread: () => import("../components/PlayList/PlayListHread.vue")
		},
		name: "PlayList"
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
	},
	{
		path: `/playlistdetails`,
		name: "PlayListDetails",
		components: {
			default: () => import("../view/PlayListDetails.vue")
		}
	},
	{
		path: `/allsongsclassify`,
		name: "AllSongsClassify",
		components: {
			default: () => import("../view/AllSongsClassify.vue")
		}
	},
	{
		path: `/songsSingCatilst`,
		name: "SongSingCatlist",
		components: {
			default: () => import("../view/SongSingCatlist.vue")
		},
		meta: {
			top: 0
		}
	},
	{
		path: `/obreak`,
		name: "NoBreak",
		components: { default: () => import("../view/NoBreak.vue") }
	},
	{
		path: `/top`,
		name: "Billboard",
		components: {
			default: () => import("../view/Billboard.vue")
		},
		meta: {}
	},
	{
		path: `/video`,
		name: "Video",
		components: {
			default: () => import("../view/Video.vue")
		}
	},
	{
		path: `/text`,
		components: {
			default: () => import("../view/Text.vue")
		}
	},
	{
		path: `/comments`,
		name: "Comments",
		components: {
			default: () => import("../view/Comments.vue")
		}
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

	return r;
};

// 组件离开的时候缓存当前位置
export const upRouterScroll = (
	to: any,
	from: any,
	dom = document.querySelector<HTMLDivElement>(".page-centent")
) => {
	let name = from.name;
	let r = routes.filter(el => el.name === name)[0];
	if (isObject(r.meta)) {
		r.meta!.top = dom!.scrollTop;
	}

	return r;
};

export default router;
