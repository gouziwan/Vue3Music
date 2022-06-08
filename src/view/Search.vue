<script lang="ts" setup>
import SearchContent from "../components/Search/SearchContent.vue";
import SearchHistory from "../components/Search/SearchHistory.vue";
import SearchResult from "../components/Search/SearchResult.vue";
import { useSearchState } from "../state/search";

const state = useSearchState();
</script>
<template>
	<div class="serach-content">
		<div v-show="!state.isSerachResult">
			<SearchHistory />
			<SearchContent />
		</div>
		<div v-show="state.isSerachResult">
			<SearchResult />
		</div>
	</div>
</template>

<style lang="scss">
.serach-content {
	padding: var(--padding-size-medium);
	color: var(--font-main-color);
}
</style>
