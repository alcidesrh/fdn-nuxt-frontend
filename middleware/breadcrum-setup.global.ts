export default defineNuxtRouteMiddleware((to, from) => {
    let temp: any = [{ label: 'Inicio', route: 'inicio', icon: 'icon-park-outline:home' }];
    let temp2: any = {};
    to.matched.forEach((v) => {
        temp2 = { route: v.name, params: to.params };
        if (v.meta.breadcrumb) {
            const breadcrumb: any = v.meta.breadcrumb;
            if (breadcrumb.label == 'arg' && to.params) {
                for (const key in to.params) {
                    temp.push({ ...temp2, ...breadcrumb, ...{ label: to.params[key] } });
                }
            } else {
                temp.push({ ...temp2, ...breadcrumb });
            }
        } else if (v.meta.breadcrumb !== false) {
            temp.push(temp2);
        }
    });
    const { breadcrumb } = useBreadcrumb();
    breadcrumb.value = temp;
});
