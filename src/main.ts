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

console.log("routes", routes);
export function createApp(isServer: boolean): [App<Element>, Router] {
	const app = createSSRApp(VueApp);

	const router = createRouter({
		history: isServer ? createMemoryHistory() : createWebHistory(),
		routes: routes ?? [],
	});

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
