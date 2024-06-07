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
import fileRoutes from "vinxi/routes";

export function createApp(isServer: boolean): [App<Element>, Router] {
	const app = createSSRApp(VueApp);

	const routes = fileRoutes.map((route) => {
		return {
			path: route.path.replace("//", "/"),
			component: () => import(/* @vite-ignore */ route.$component.src),
		};
	});

	const router = createRouter({
		history: isServer ? createMemoryHistory() : createWebHistory(),
		routes,
	});

	app.use(router);

	return [app, router];
}
