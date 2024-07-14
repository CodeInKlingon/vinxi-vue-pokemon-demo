import { inject } from "vue";
import { useRoute } from "vue-router";

export function useLoaderData(path: string) {
	const route = useRoute();
	const matched = route.matched.find((record) => record.path === path);

	if (!matched) {
		return {};
	}
	const routerData = inject<any>("routeData");
	return routerData[matched.path] ?? {};
}
