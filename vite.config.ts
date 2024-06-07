import vue from "@vitejs/plugin-vue";
import { createApp, resolve } from "vinxi";
import { VueFileSystemRouter } from "./src/router";
//@ts-ignore
import { serverFunctions } from "@vinxi/server-functions/plugin";

import { config } from "vinxi/plugins/config";

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
				vue(),
			],
			routes: (router, app) => {
				return new VueFileSystemRouter(
					{
						dir: resolve.absolute("./pages", router.root!),
						extensions: ["vue", "ts"],
					},
					router,
					app
				);
			},
		},
		{
			name: "ssr",
			type: "http",
			handler: "./src/entry-server.ts",
			target: "server",
			plugins: () => [vue()],
			routes: (router, app) => {
				return new VueFileSystemRouter(
					{
						dir: resolve.absolute("./pages", router.root!),
						extensions: ["vue", "ts"],
					},
					router,
					app
				);
			},
		},
		serverFunctions.router(),
	],
});
