<script lang="ts" setup name="User">
import UserAvatar from "../components/User/UserAvatar.vue";
import UserMusic from "../components/User/UserMusic.vue";
</script>

<template>
	<div class="user">
		<UserAvatar />
		<UserMusic />
	</div>
</template>

<style lang="scss">
.user {
	color: var(--font-main-color);
}
</style>
