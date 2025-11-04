const breadcrumb: any = ref();
function breadcrumbReload(route) {
	if (route.matched.length == 0) {
		return {};
	}
	const pathArray = route.path.split('/');
	const routeArray = route.matched[route.matched.length - 1].path.split('/');
	breadcrumb.value = pathArray.reduce((breadcrumbArray, path, idx) => {
		const temp = route.matched[idx];
		if (
			path != routeArray[idx] &&
			routeArray[idx] &&
			routeArray[idx].includes(':')
		) {
			const last = breadcrumbArray.length - 1;
			if (typeof breadcrumbArray[last].path != undefined) {
				delete breadcrumbArray[last].path;
			}
			// breadcrumbArray[last].path = breadcrumbArray[last].path + '/' + path;
			breadcrumbArray[last].label = `${
				routeArray[idx].replace(/:.*/, '') + path
			} `;
			breadcrumbArray[last].icon =
				temp?.meta.icon || breadcrumbArray[last].icon;
		} else {
			(breadcrumbArray as any).push({
				path: `/${path}`,
				label: temp?.meta.label || path,
				icon: temp?.meta.icon || null,
			});
		}
		return breadcrumbArray;
	}, []);
}
export function useBreadcrumb() {
	return { breadcrumb, breadcrumbReload };
}
