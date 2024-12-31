import type { RouterConfig } from '@nuxt/schema';
import { h, resolveComponent } from 'vue';
export default {
    // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
    routes: (): any => [
        {
            name: 'home',
            path: '/',
            component: () => import('~/pages/index.vue'),
            meta: { label: 'inicio', icon: 'icon-park-outline:home' },
            children: [
                {
                    name: 'inicio',
                    path: '',
                    component: () => import('~/pages/dashboard.vue')
                    // meta: { label: 'inicio', icon: 'icon-park-outline:home' }
                },
                {
                    path: '/usuarios',
                    meta: { label: 'usuarios', icon: 'icon-park-outline:every-user' },

                    children: [
                        {
                            name: 'user_collection',
                            path: '',
                            component: () => import('~/pages/usuarios/UserList.vue'),
                            meta: { type: 'user', action: 'list', route: 'user_collection' }
                        },
                        {
                            name: 'user_edit',
                            path: ':username',
                            component: () => import('~/pages/usuarios/UserEdit.vue'),
                            meta: { icon: 'icon-park-outline:user', type: 'user', action: 'edit', route: 'user_edit' }
                        }
                    ]
                },
                {
                    path: '/estaciones',
                    meta: { label: 'estaciones', icon: 'icon-park-outline:every-user' },

                    children: [
                        {
                            name: 'estacion_collection',
                            path: '',
                            component: () => import('~/pages/estacions/EstacionList.vue'),
                            meta: { type: 'estacion', action: 'list', route: 'estacion_collection' }
                        },
                        {
                            name: 'estacion_edit',
                            path: ':slug',
                            component: () => import('~/pages/estacions/EstacionEdit.vue'),
                            meta: { icon: 'icon-park-outline:user', type: 'estacion', action: 'edit', route: 'estacion_edit' }
                        }
                    ]
                }
            ]
        }
    ]
} satisfies RouterConfig;
