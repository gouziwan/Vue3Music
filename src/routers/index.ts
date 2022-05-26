import { DefineComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import User from "../view/User.vue";
import Home from "../view/Home.vue";
import PlayList from "../view/PlayList.vue";
import Text from "../view/Text.vue";

import HomeHread from "../components/Home/HomeHread.vue";

export interface RoutesType {
	path: string;
	components: {
		default: DefineComponent<{}, {}, any>;
		hread: DefineComponent<{}, {}, any>;
	};
	name: string;
}

const routes: RoutesType[] = [
	{
		path: "/",
		components: {
			default: Home,
			hread: HomeHread
		},
		name: "Home"
	}
];

/**
 * 
 * 
 * ,
	{
		path: "/playList",
		component: PlayList,
		name: "PlayList"
	},
	{
		path: "/user",
		component: User,
		name: "User"
	},
	{
		path: "/test",
		component: Text,
		name: "Text"
	}
 */

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
