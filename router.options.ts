import type { RouterConfig } from '@nuxt/schema';
import { h, resolveComponent } from 'vue';
export default {
    // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
    routes: (_routes) => [
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
                    // name: 'usuarios',
                    path: '/usuarios',
                    // component: () => import('~/pages/router.vue'),
                    meta: { label: 'usuarios', icon: 'icon-park-outline:every-user' },

                    children: [
                        {
                            name: 'usuario_collection',
                            path: '',
                            component: () => import('~/pages/usuarios/UserList.vue')
                            // meta: { icon: 'icon-park-outline:every-user' }
                        },
                        {
                            name: 'usuario_edit',
                            path: ':username',
                            component: () => import('~/pages/usuarios/UserEdit.vue'),
                            meta: { icon: 'icon-park-outline:user' }
                        }
                    ]
                }
            ]
        }
    ]
} satisfies RouterConfig;
