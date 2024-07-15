import { createSSRApp } from "vue";
import type { App } from "vue";
import {
	createRouter,
	createWebHistory,
	createMemoryHistory,
	type Router,
} from "vue-router";

import "./style.css";
import VueApp from "./App.vue";
import { routes, handleHotUpdate } from "vue-router/auto-routes";
import { DataLoaderPlugin } from "unplugin-vue-router/data-loaders";
import { createPinia } from "pinia";
import { QueryPlugin } from "@pinia/colada";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import "primeicons/primeicons.css";

export function createApp(isServer: boolean): [App<Element>, Router] {
	const app = createSSRApp(VueApp);

	app.use(PrimeVue, {
		theme: {
			preset: Aura,
		},
	});

	const router = createRouter({
		history: isServer ? createMemoryHistory() : createWebHistory(),
		routes: routes ?? [],
	});

	app.use(createPinia());
	// install after pinia
	app.use(QueryPlugin, {
		// optional options
	});

	app.use(DataLoaderPlugin, { router });

	app.use(router);

	if (import.meta.hot) {
		handleHotUpdate(router);
	}

	return [app, router];
}

export async function Wait(delayInSeconds: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, delayInSeconds * 1000);
	});
}
