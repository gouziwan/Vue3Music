<script lang="ts" setup>
import { Cell, Icon, Tab, Tabs } from "vant";

const tabsArr = [
	{
		title: "创建歌单",
		valueIcon: "dogadd",
		rightIcon: "doggengduo",
		defaultIcon: "dogmeiyougengduoxiaoxi"
	},
	{
		title: "收藏歌单",
		valueIcon: "dogadd",
		rightIcon: "doggengduo",
		defaultIcon: "dogmeiyougengduoxiaoxi"
	}
];
</script>
<template>
	<div class="user-my-music">
		<div class="user-like-music">
			<Cell title="我喜欢的音乐" label="0首" center>
				<template #icon>
					<div class="user-like-icon">
						<Icon name="dogiconzhengli" class-prefix="dog" size="0.8rem"></Icon>
					</div>
				</template>
			</Cell>
		</div>

		<div class="user-music-list">
			<Tabs background="transparent" scrollspy title-active-color="var(--font-main-color)">
				<Tab v-for="item in tabsArr" :title="item.title">
					<div class="user-create-music">
						<div class="create-music-title">
							<Cell>
								<template #title>
									<div class="title">{{ item.title }}</div>
								</template>

								<template #value>
									<div class="icon">
										<Icon :name="item.valueIcon" class-prefix="dog" size="0.35rem" />
									</div>
								</template>
								<template #right-icon>
									<div class="icon">
										<Icon :name="item.rightIcon" class-prefix="dog" size="0.35rem" />
									</div>
								</template>
							</Cell>
						</div>
						<div class="create-music-content">
							<div class="create-music-default">
								<Icon :name="item.defaultIcon" class-prefix="dog" size="1rem"></Icon>
								<p>暂无{{ item.title }}</p>
							</div>
						</div>
					</div>
				</Tab>
			</Tabs>
		</div>
	</div>
</template>

<style lang="scss">
.user-my-music {
	padding: var(--padding-size-medium);

	.user-like-music {
		background-color: var(--background-color-light);
		border-radius: 0.2rem;
		.van-cell {
			background: transparent;
		}
		.user-like-icon {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 1.3rem;
			width: 1.3rem;
			margin-right: var(--margin-size-left-mini);
			background-color: darkgray;
			border-radius: 0.2rem;
		}
	}

	.user-music-list {
		margin-top: 20px;
		.user-create-music {
			padding: var(--padding-size-medium);
			background-color: var(--background-color-light);
			margin-top: var(--margin-size-medium);
			border-radius: 0.15rem;

			.van-cell {
				padding: 0px var(--van-cell-horizontal-padding);
			}

			.title {
				font-size: 20px;
			}
			.icon {
				color: var(--font-main-color);
				padding: 0 var(--margin-size-left-mini);
				display: inline-block;
			}

			.icon:nth-child(2) {
				margin: 0;
			}

			.create-music-content {
				min-height: 2rem;
				display: flex;
				align-items: center;
				justify-content: center;
				.create-music-default {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					p {
						margin-top: var(--margin-size-left-mini);
					}
				}
			}
		}
	}
}
</style>
