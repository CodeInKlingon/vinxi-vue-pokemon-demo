<template>
	<div>
		<h1>Edit: {{ route.params.aboutId }}</h1>
		<p>Editing the about page</p>
		<pre>{{ user }}</pre>
	</div>
</template>
<script lang="ts">
import { defineColadaLoader } from "unplugin-vue-router/data-loaders/pinia-colada";
import { getUser } from "../../../actions/user";

export const useUserData = defineColadaLoader("/about/edit/[aboutId]", {
	async query(to, { signal }) {
		return getUser(to.params.aboutId as string);
	},
	key: (to) => ["users", to.params.aboutId as string],
	// Keep the data "fresh" 10 seconds to avoid fetching the same data too often
	staleTime: 10000,
});
</script>

<script setup lang="ts">
import { useRoute } from "vue-router";

const { data: user, status, error, isLoading, reload, refresh } = useUserData();
const route = useRoute("/about/edit/[aboutId]");
</script>
