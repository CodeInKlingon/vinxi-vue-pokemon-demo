<template>
	<div>
		<h1>Edit: {{ route.params.id }}</h1>
		<p>Editing pokemon</p>
		<pre>{{ pokemon }}</pre>
	</div>
</template>
<script lang="ts">
import { defineColadaLoader } from "unplugin-vue-router/data-loaders/pinia-colada";
import { getPokemon } from "../../../actions/pokemon";

export const useUserData = defineColadaLoader("/pokedex/edit/[id]", {
	async query(to, { signal }) {
		return getPokemon(to.params.id as string);
	},
	key: (to) => ["users", to.params.id as string],
	// Keep the data "fresh" 10 seconds to avoid fetching the same data too often
	staleTime: 10000,
});
</script>

<script setup lang="ts">
import { useRoute } from "vue-router";

const {
	data: pokemon,
	status,
	error,
	isLoading,
	reload,
	refresh,
} = useUserData();
const route = useRoute("/pokedex/edit/[id]");
</script>
