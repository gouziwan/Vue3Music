// 准备进入
export function beforeEnter(el: HTMLDivElement) {
	el.style.transition = "all 0.5s";
	el.style.position = "absolute";
}

// 进入时
export function enter(el: HTMLDivElement, done: any) {
	let h = window.getComputedStyle(document.querySelector<HTMLDivElement>(".page-button")!).height;
	el.style.bottom = -el.offsetHeight + "px";
	setTimeout(() => {
		el.style.bottom = h;
		done();
	}, 100);
}

export function afterEnter(el: HTMLDivElement) {
	setTimeout(() => {
		el.style.position = "";
		el.style.bottom = "";
		el.style.transition = "";
	}, 700);
}

// 准备离开
export function beforeLeave(el: HTMLDivElement) {
	// 如果离开的时候肯定是高 - el 的高的
	let h = document.querySelector<HTMLDivElement>(".page-button")!.offsetHeight;
	let elh = el.offsetHeight;
	el.style.bottom = h - elh + "px";
	el.style.position = "absolute";
	el.style.transition = "all 0.5s";
}

// 离开时
export function leave(el: HTMLDivElement, done: any) {
	el.style.bottom = -el.offsetHeight + "px";
	Promise.resolve().then(() => done());
}
