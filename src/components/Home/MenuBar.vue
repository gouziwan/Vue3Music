<script lang="ts" setup>
import { useRouter } from "vue-router";
import { getAncestorNodes } from "../../utils";
import Day from "../../utils/Date";

const router = useRouter();

const menuDate = [
	{
		icon: "dogrili1",
		txt: "每日推荐",
		is: true,
		click: to("/obreak")
	},
	{
		icon: "dog-dogicon-test",
		txt: "推荐歌单",
		click: to("PlayList")
	},
	{
		icon: "dogpaihangbang2",
		txt: "排行榜"
	}
];

function to(path: string) {
	return function () {
		router.push(path);
	};
}

const date = new Day();

const onClick = (e: Event) => {
	let target = e.target as HTMLDivElement;

	target = getAncestorNodes(target, ".home-menubar-item");

	if (target && target.dataset.index != undefined) {
		const { index } = target.dataset;

		let tab = menuDate[index as any];

		tab.click && tab.click();
	}
};
</script>

<template>
	<div class="home-menubar">
		<div
			class="home-menubar-item"
			v-for="(item, index) in menuDate"
			:data-index="index"
			@click="onClick"
		>
			<div class="home-menubar-icon">
				<i :class="`dog ${item.icon}`"></i>
				<template v-if="item.is">
					<div class="home-date">{{ date.getCurrentDay() }}</div>
				</template>
			</div>
			<div class="home-item-txt">
				{{ item.txt }}
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.home-menubar {
	display: flex;
	color: var(--font-main-color);
	justify-content: space-around;
	padding: 10px 0;
	.home-menubar-item {
		display: flex;
		flex-direction: column;
		align-items: center;

		.dog {
			font-size: 55px;
		}

		.dog.dogrili1 {
			font-size: 50px;
		}

		.home-item-txt {
			margin-top: 10px;
		}

		.home-menubar-icon {
			position: relative;

			.home-date {
				position: absolute;
				top: 50%;
				left: 50%;
				font-size: 20px;
				transform: translate(-50%, -35%);
			}
		}
	}
}
</style>
