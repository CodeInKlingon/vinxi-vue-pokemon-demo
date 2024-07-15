<template>
	<h1>Pokemon List</h1>
	<!-- <pre>{{ pokemon }}</pre> -->
	<div class="pokemon-list">
		<div class="pokemon-list-item" v-for="poke in pokemon" :key="poke.id">
			<router-link :to="`/pokedex/view/${poke.id}`">
				<img
					:src="getPokemonImage(poke.id)"
					alt="poke.name.english"
					style="width: 100%"
				/>
				<span>
					{{ poke.name.english }}
				</span>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineColadaLoader } from "unplugin-vue-router/data-loaders/pinia-colada";
import { getPokemonList } from "../../actions/pokemon";

export const useUserData = defineColadaLoader("/pokedex", {
	async query(to, { signal }) {
		return getPokemonList();
	},
	key: (to) => ["pokemon"],
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
const route = useRoute("/pokedex/view/[id]");

function getPokemonImage(id: number) {
	return `/images/${String(id).padStart(3, "0")}.png`;
}
</script>
<style scoped>
.pokemon-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
	gap: 1em;
}
</style>
