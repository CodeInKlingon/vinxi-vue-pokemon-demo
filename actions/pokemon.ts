"use server";
import pokemon from "./json/pokemon.json-master/pokedex.json";

export function getPokemon(id: string) {
	const user = {
		firstName: "Daniel",
		lastName: "Stokes",
		age: 29,
		id: id,
	};

	return pokemon.find((p) => p.id === parseInt(id));
}

export function getPokemonList() {
	return pokemon;
}
