<script lang="ts" setup>
import ListModule from "./ListModule.vue";
import { Image } from "vant";
import { getRecommendedMv } from "../../Api/Home/index";

getRecommendedMv(res => {
	console.log(res);
});
</script>
<template>
	<ListModule title="推荐MV" isShow>
		<div class="reco-mv">
			<div class="reco-mv-inner">
				<div class="reco-mv-inner-item">
					<Image />
				</div>
			</div>
		</div>
	</ListModule>
</template>

<style lang="scss"></style>
