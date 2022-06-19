type RequestCallBack = (res: any, data: any) => void;

interface CellClassifyType {
	icon: string;
	title: string;
	right?: boolean | string;
}

interface GroupingType {
	user: {
		title: string;
		arr: CellClassifyType[];
	};
	settings: {
		title: string;
		arr: CellClassifyType[];
	};
}

interface VideoClassifyType {
	name: string;
	id: number | string;
	videoArr: any[];
	isLogin: any;
	Finished: any;
}

interface TabsType {
	// 标题
	title: string;
	// 数据
	arr: any[];
	// 最大值
	max: number;
	// 获取数组的key
	key: string;
	// 总数的key
	countkey: string;
	// name 是标题的 key值
	name: string;
	// 类型
	type: number;
	// 图片的url连接
	url?: string;
	// 图片显示大小
	imgSize?: {
		width: string;
		height: string;
		radius: string;
	};
	// 是否隐藏左边的管理图标
	isShowRightIcon?: Boolean;
	// 	是否省略 title 标题
	isOmitTitle?: Boolean;
	// 是否居中文字  true 是不需要 false 是需要
	cellCenter?: Boolean;
	// 图片分辨率 默认 300y300
	imgdpi?: string;
	// 是否要边框线
	isBorder?: true;
	// 是否当前正在加载
	isLoading: Boolean;
	click: Function;
}
