<script setup lang="ts">
import HelloWorld from "../components/HelloWorld.vue";
</script>

<template>
	<Suspense>
		<router-view></router-view>
	</Suspense>
	<Suspense>
		<HelloWorld msg="Vite + Vue" />
	</Suspense>
	<ul>
		<li><router-link to="/">Index</router-link></li>
		<li><router-link to="/about">About</router-link></li>
	</ul>
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
