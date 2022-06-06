// 加载常用的组件
import {
	Icon,
	Lazyload,
	NavBar,
	Search,
	Swipe,
	SwipeItem,
	Image as VantImage,
	Button,
	Cell
} from "vant";

export default function useComponent(app: any) {
	app
		.use(Lazyload, { lazyComponent: true })
		.use(NavBar)
		.use(Search)
		.use(Icon)
		.use(Swipe)
		.use(SwipeItem)
		.use(VantImage)
		.use(Button)
		.use(Cell);
}
