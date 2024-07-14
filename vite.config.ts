import vue from "@vitejs/plugin-vue";
import { createApp, resolve } from "vinxi";
//@ts-ignore
import { serverFunctions } from "@vinxi/server-functions/plugin";

import { config } from "vinxi/plugins/config";
import VueRouter from "unplugin-vue-router/vite";

export default createApp({
	routers: [
		{
			name: "public",
			type: "static",
			dir: "./public",
			base: "/",
		},
		{
			name: "client",
			type: "client",
			handler: "./src/entry-client.ts",
			target: "browser",
			base: "/_build",
			plugins: () => [
				serverFunctions.client(),
				config("custom", {
					define: {
						__DEFINES__: "{}",
					},
				}),
				VueRouter({
					/* options */
					routesFolder: ["pages"],
				}),
				vue(),
			],
		},
		{
			name: "ssr",
			type: "http",
			handler: "./src/entry-server.ts",
			target: "server",
			plugins: () => [
				VueRouter({
					/* options */
					routesFolder: ["pages"],
				}),
				config("custom", {
					ssr: {
						noExternal: ["vue-router"],
					},
				}),
				vue(),
			],
		},
		serverFunctions.router(),
	],
});
