type InputRoute<T> = T & {
	path: string;
};

type IntermediateRoute<T> = T & {
	path: string;
	children?: Map<string, IntermediateRoute<T>>;
};

type OutputRoute<T> = T & {
	path: string;
	children?: OutputRoute<T>[];
};

export function convertToNestedRoutes(fileRoutes) {
	function processRoute(routes, route, id: string, full: string) {
		const parentRoute = Object.values(routes).find((o) => {
			return id.startsWith(o.id + "/");
		});

		if (!parentRoute) {
			console.log("route", parentRoute, full);
			let path = id;
			if (full.includes("/")) {
				// route.path = route.path.slice(1); // Remove leading slash
				const count = (full.match(/\//g) || []).length; // Count the number of "/"
				if (count != 1) {
					console.log("slice", path);
					path = path.slice(1, path.length);
				}
			}
			routes.push({
				path: path,
				// ...route,
				component: () =>
					import(/* @vite-ignore */ route.$component.src),
				id,
				// path: id
				// 	.replace(/\/\([^)/]+\)/g, "")
				// 	.replace(/\([^)/]+\)/g, ""),
			});
			return routes;
		}
		// route.path = route.path.slice(0); // Remove leading slash

		processRoute(
			parentRoute.children || (parentRoute.children = []),
			route,
			id.slice(parentRoute.id.length),
			full
		);

		return routes;
	}

	return fileRoutes
		.sort((a, b) => a.path.length - b.path.length)
		.reduce((prevRoutes, route) => {
			return processRoute(prevRoutes, route, route.path, route.path);
		}, []);
}
