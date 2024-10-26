import type { RouterConfig } from '@nuxt/schema';
import { h, resolveComponent } from 'vue';
export default {
    // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
    routes: (_routes) => [
        {
            name: 'inicio',
            path: '/',
            component: () => import('~/pages/index.vue'),
            meta: { breadcrumb: false }
        },
        {
            name: 'usuarios',
            path: '/usuarios',
            component: {
                render: () => h(resolveComponent('router-view'))
            },
            meta: { breadcrumb: { label: 'usuarios', route: 'usuario_collection', icon: 'icon-park-outline:every-user' } },
            children: [
                {
                    name: 'usuario_collection',
                    path: '',
                    component: () => import('~/pages/usuarios/UserList.vue'),
                    meta: { breadcrumb: false }
                },
                {
                    name: 'usuario_edit',
                    path: ':username',
                    component: () => import('~/pages/usuarios/UserEdit.vue'),
                    meta: { breadcrumb: { label: 'arg', icon: 'icon-park-outline:user' } }
                }
            ]
        }
    ]
} satisfies RouterConfig;
