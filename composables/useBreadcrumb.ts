const breadcrumb: any = ref();

function breadcrumbReload(route) {
    let pathArray = route.path.split('/');
    breadcrumb.value = pathArray.reduce((breadcrumbArray, path, idx) => {
        const temp = route.matched[idx];
        (breadcrumbArray as any).push({
            path: '/' + path,
            label: temp?.meta.label || path,
            icon: temp?.meta.icon || null
        });
        return breadcrumbArray;
    }, []);
    breadcrumb.value[breadcrumb.value.length - 1].last = true;
}
export const useBreadcrumb = () => {
    return { breadcrumb, breadcrumbReload };
};
