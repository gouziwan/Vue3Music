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
