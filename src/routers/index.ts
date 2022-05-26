import { DefineComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import User from "../view/User.vue";
import Home from "../view/Home.vue";
import PlayList from "../view/PlayList.vue";
import Text from "../view/Text.vue";

import HomeHread from "../components/Home/HomeHread.vue";
import UserHread from "../components/User/UserHread.vue";

export interface RoutesType {
	path: string;
	components: {
		default: DefineComponent<{}, {}, any>;
		hread: DefineComponent<{}, {}, any>;
	};
	name: string;
}

// 路由
const routes: RoutesType[] = [
	{
		// 路径
		path: "/",
		// 组件
		components: {
			default: Home,
			hread: HomeHread
		},
		name: "Home"
	},
	{
		path: "/user",
		components: {
			default: User,
			hread: UserHread
		},
		name: "User"
	}
];

// 创建路由
const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
