export default defineNuxtRouteMiddleware((to, from) => {
    const { breadcrumbReload } = useBreadcrumb();
    breadcrumbReload(to);
});
