// 准备进入
export function beforeEnter(el: HTMLDivElement) {
	el.style.bottom = "-100px";
	el.style.transition = "all .5s";
	el.style.width = "100%";
}

// 进入时
export function enter(el: HTMLDivElement, done: any) {
	// 这里要把他放进 宏任务 是 因素 display:none 原因 先让你显示出来再执行动画直接执行不会有动画效果
	setTimeout(() => {
		el.style.bottom = "0px";
		done();
	}, 0);
}

// 进入完成
export function enterCancelled(el: HTMLDivElement) {
	el.style.bottom = "";
	el.style.transition = "";
}

// 准备离开
export function beforeLeave(el: HTMLDivElement) {
	el.style.bottom = "0px";
	el.style.transition = "all .7s";
}

// 离开时
export function leave(el: HTMLDivElement, done: any) {
	el.style.bottom = "-100px";
	setTimeout(() => {
		done();
	}, 300);
}
