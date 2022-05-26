<script lang="ts" setup>
import Day from "../../utils/Date";

const menuDate = [
	{
		icon: "dogrili1",
		txt: "每日推荐",
		is: true
	},
	{
		icon: "dog-dogicon-test",
		txt: "推荐歌单"
	},
	{
		icon: "dogpaihangbang2",
		txt: "排行榜"
	}
];

const date = new Day();
</script>

<template>
	<div class="home-menubar">
		<div class="home-menubar-item" v-for="item in menuDate">
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
