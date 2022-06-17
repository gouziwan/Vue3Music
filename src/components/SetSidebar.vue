<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "../state/popup";
import UserAvatarVue from "./User/UserAvatar.vue";

const usePopup = useStore();

const getStyle = computed(() => {
	return {
		height: window.innerHeight + "px"
	};
});
</script>
<template>
	<van-popup v-model:show="usePopup.sidebar" position="left">
		<div class="sidebar-content" :style="getStyle">
			<div class="sidebar-hread">
				<UserAvatarVue
					content-class="avatar"
					width="1rem"
					height="1rem"
					IconSize="0.8rem"
				></UserAvatarVue>
			</div>

			<div class="sidebar-content"></div>
		</div>
	</van-popup>
</template>

<style lang="scss" scoped>
.sidebar-content {
	display: block;
	color: var(--font-main-color);
	height: 100%;
	background-color: var(--background-main-color);
	width: 600px;

	.sidebar-hread {
		.image {
			width: 1rem;
			height: 1rem;
			border-radius: 50%;
		}

		::v-deep(.user-avatar-content.avatar) {
			padding: 0;
			background-color: transparent;
		}
	}
}
</style>
