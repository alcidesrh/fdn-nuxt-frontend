const breadcrumb: any = ref();
function breadcrumbReload(route) {
    let pathArray = route.path.split('/'),
        routeArray = route.matched[route.matched.length - 1].path.split('/');
    breadcrumb.value = pathArray.reduce((breadcrumbArray, path, idx) => {
        const temp = route.matched[idx];
        if (path != routeArray[idx] && routeArray[idx].indexOf(':') != -1) {
            const last = breadcrumbArray.length - 1;
            breadcrumbArray[last].path = breadcrumbArray[last].path + '/' + path;
            breadcrumbArray[last].label = routeArray[idx].replace(/:/, '') + ': ' + path + ' ';
            breadcrumbArray[last].label;
            breadcrumbArray[last].icon = temp?.meta.icon || breadcrumbArray[last].icon;
        } else {
            (breadcrumbArray as any).push({
                path: '/' + path,
                label: temp?.meta.label || path,
                icon: temp?.meta.icon || null
            });
        }
        return breadcrumbArray;
    }, []);
}
export const useBreadcrumb = () => {
    return { breadcrumb, breadcrumbReload };
};
