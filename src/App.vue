<script setup lang="ts">
import HelloWorld from "../components/HelloWorld.vue";
import Menubar from "primevue/menubar";
</script>

<template>
	<Menubar
		:model="[
			{
				icon: 'pi pi-home',
				label: 'Home',
				route: '/',
			},
			{
				icon: 'pi pi-book',
				label: 'Pokedex',
				route: '/pokedex',
			},
		]"
	>
		<template #item="{ item, props, hasSubmenu }">
			<router-link
				v-if="item.route"
				v-slot="{ href, navigate }"
				:to="item.route"
				custom
			>
				<a
					v-ripple
					:href="href"
					v-bind="props.action"
					@click="navigate"
				>
					<span :class="item.icon" />
					<span class="ml-2">{{ item.label }}</span>
				</a>
			</router-link>
			<a
				v-else
				v-ripple
				:href="item.url"
				:target="item.target"
				v-bind="props.action"
			>
				<span :class="item.icon" />
				<span class="ml-2">{{ item.label }}</span>
				<span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
			</a>
		</template>

		<template #end>
			<Suspense>
				<HelloWorld msg="Vite + Vue" />
			</Suspense>
		</template>
	</Menubar>
	<Suspense>
		<router-view></router-view>
	</Suspense>
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
