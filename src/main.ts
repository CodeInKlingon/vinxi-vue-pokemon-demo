import { createSSRApp, reactive } from "vue";
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
import { convertToNestedRoutes } from "./vue-router";

export function createApp(isServer: boolean): [App<Element>, Router] {
	const app = createSSRApp(VueApp);

	// const routes = fileRoutes.map((route) => {
	// 	return {
	// 		path: route.path.replace("//", "/"),
	// 		component: () => import(/* @vite-ignore */ route.$component.src),
	// 	};
	// });
	// const test = defineRoutes(fileRoutes, (route) => {
	// 	return {
	// 		path: route.path,
	// 		component: () => import(/* @vite-ignore */ route.$component.src),
	// 		// originalPath: fullPath,
	// 		children: route.children,
	// 	};
	// });

	console.log("fileRoutes", JSON.stringify(fileRoutes));

	const test = [
		{
			path: "/",
			component: () => import(/* @vite-ignore */ "../pages/index.vue"),
		},
		{
			path: "/about",
			component: () => import(/* @vite-ignore */ "../pages/about.vue"),
			meta: {
				load: async () => {
					await Wait(1);
					return { detail: "about" };
				},
			},
			children: [
				{
					path: "create",

					component: () =>
						import(/* @vite-ignore */ "../pages/about/create.vue"),
				},
				{
					path: "edit",
					component: () =>
						import(/* @vite-ignore */ "../pages/about/edit.vue"),
					meta: {
						load: async () => {
							await Wait(1.1);
							return { detail: "edit" };
						},
					},
					children: [
						{
							path: ":aboutId",
							component: () =>
								import(
									/* @vite-ignore */ "../pages/about/edit/[aboutId].vue"
								),
							load: async ({ params }) => {
								await Wait(1.2);
								return { aboutId: params.aboutId };
							},
						},
					],
				},
				{
					path: "",
					component: () =>
						import(/* @vite-ignore */ "../pages/about/index.vue"),
				},
			],
		},
	];

	const router = createRouter({
		history: isServer ? createMemoryHistory() : createWebHistory(),
		routes: test,
	});

	const routeData = reactive({});

	app.provide("routeData", routeData);
	router.beforeEach(async (to, from) => {
		await Promise.all(
			to.matched
				.filter(
					(record) =>
						record.meta && record.meta.load && !record.meta.loadLazy
				)
				.map((record) => async () => {
					// @ts-ignore
					const data = await record.meta.load({ params: to.params });
					routeData[record.path] = data;
				})
		);
		to.matched.forEach((record) => {
			if (record.meta && record.meta.load && record.meta.loadLazy) {
				// @ts-ignore
				record.meta.load({ params: to.params });
			}
		});
	});

	app.use(router);

	return [app, router];
}

export async function Wait(delayInSeconds: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, delayInSeconds * 1000);
	});
}
