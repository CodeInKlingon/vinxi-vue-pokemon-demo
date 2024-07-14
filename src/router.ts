import { BaseFileSystemRouter, cleanPath } from "vinxi/fs-router";

export class VueFileSystemRouter extends BaseFileSystemRouter {
	toPath(src: string) {
		const routePath = cleanPath(src, this.config)
			// remove the initial slash
			.slice(1)
			.replace(/index$/, "")
			.replace(/\[(\w+)\]/g, ":$1");

		return routePath?.length > 0 ? `/${routePath}` : "/";
	}

	toRoute(filePath: string) {
		return {
			path: this.toPath(filePath),
			$component: {
				src: filePath,
				pick: ["default"],
			},
		};
	}
}
