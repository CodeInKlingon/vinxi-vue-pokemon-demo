<template>
	<div>
		<h1>View: {{ route.params.id }}</h1>
		<p>Viewing Pokemon</p>
		<img :src="getPokemonImage(poke.id)" alt="poke.name.english" />
		<pre>{{ poke }}</pre>
	</div>
</template>
<script lang="ts">
import { defineColadaLoader } from "unplugin-vue-router/data-loaders/pinia-colada";
import { getPokemon } from "../../../actions/pokemon";

export const useUserData = defineColadaLoader("/pokedex/view/[id]", {
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

const { data: poke, status, error, isLoading, reload, refresh } = useUserData();
const route = useRoute("/pokedex/view/[id]");
function getPokemonImage(id: number) {
	return `/images/${String(id).padStart(3, "0")}.png`;
}
</script>
