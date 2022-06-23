// 准备进入
export function beforeEnter(el: HTMLDivElement) {
	el.style.bottom = "-100px";
	el.style.transition = "all .5s";
	el.style.width = "100%";
}

// 进入时
export function enter(el: HTMLDivElement, done: any) {
	el.style.bottom = "0px";
	done();
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
	// done();
}
