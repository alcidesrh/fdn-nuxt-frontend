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
                            name: 'user_list',
                            path: '',
                            component: () => import('~/pages/usuarios/UserList.vue'),
                            meta: { type: 'user', action: 'list', route: 'user_list' }
                        },
                        {
                            name: 'user_create',
                            path: 'crear',
                            component: () => import('~/pages/usuarios/UserForm.vue'),
                            meta: { icon: 'icon-park-outline:edit', type: 'user', action: 'create', route: 'users_create' }
                        },
                        {
                            name: 'user_edit',
                            path: 'edit/:id',
                            component: () => import('~/pages/usuarios/UserForm.vue'),
                            meta: { icon: 'icon-park-outline:edit', type: 'user', action: 'edit', route: 'user_edit' }
                        }
                    ]
                },

                {
                    path: '/menus',
                    meta: { label: 'menu', icon: 'icon-park-outline:tree-list' },

                    children: [
                        {
                            name: 'menu_list',
                            path: '',
                            component: () => import('~/pages/menus/MenuList.vue'),
                            meta: { type: 'menu', action: 'list', route: 'menu_collection', class: 'grid grid-cols-3 gap-4' }
                        },
                        {
                            name: 'menu_edit',
                            path: 'edit/:id',
                            component: () => import('~/pages/menus/MenuForm.vue'),
                            meta: { icon: 'icon-park-outline:edit', type: 'menu', action: 'edit', route: 'menu_edit' }
                        },
                        {
                            name: 'menu_create',
                            path: 'crear',
                            component: () => import('~/pages/menus/MenuForm.vue'),
                            meta: { icon: 'icon-park-outline:edit', type: 'menu', action: 'create', route: 'menu_create' }
                        }
                    ]
                },
                {
                    path: '/roles',
                    meta: { label: 'role', icon: 'icon-park-outline:tree-list' },

                    children: [
                        {
                            name: 'role_list',
                            path: '',
                            component: () => import('~/pages/roles/RoleList.vue'),
                            meta: { type: 'role', action: 'list', route: 'role_collection' }
                        },
                        {
                            name: 'role_edit',
                            path: 'edit/:id',
                            component: () => import('~/pages/roles/RoleForm.vue'),
                            meta: { icon: 'icon-park-outline:edit', type: 'role', action: 'edit', route: 'role_edit' }
                        },
                        {
                            name: 'role_create',
                            path: 'crear',
                            component: () => import('~/pages/roles/RoleForm.vue'),
                            meta: { icon: 'icon-park-outline:edit', type: 'role', action: 'create', route: 'role_create' }
                        }
                    ]
                },
                {
                    path: '/localidades',
                    meta: { label: 'localidad', icon: 'icon-park-outline:tree-list' },

                    children: [
                        {
                            name: 'localidad_list',
                            path: '',
                            component: () => import('~/pages/localidads/LocalidadList.vue'),
                            meta: { type: 'localidad', action: 'list', route: 'localidad_collection' }
                        },
                        {
                            name: 'localidad_edit',
                            path: 'edit/:id',
                            component: () => import('~/pages/localidads/LocalidadForm.vue'),
                            meta: { icon: 'icon-park-outline:edit', type: 'localidad', action: 'edit', route: 'localidad_edit' }
                        },
                        {
                            name: 'localidad_create',
                            path: 'crear',
                            component: () => import('~/pages/localidads/LocalidadForm.vue'),
                            meta: { icon: 'icon-park-outline:edit', type: 'localidad', action: 'create', route: 'localidad_create' }
                        }
                    ]
                },
                {
                    path: '/paises',
                    meta: { label: 'nacion', icon: 'icon-park-outline:tree-list' },

                    children: [
                        {
                            name: 'nacion_list',
                            path: '',
                            component: () => import('~/pages/nacion/NacionList.vue'),
                            meta: { type: 'nacion', action: 'list', route: 'nacion_collection' }
                        },
                        {
                            name: 'nacion_edit',
                            path: 'edit/:id',
                            component: () => import('~/pages/nacion/NacionForm.vue'),
                            meta: { icon: 'icon-park-outline:edit', type: 'nacion', action: 'edit', route: 'nacion_edit' }
                        },
                        {
                            name: 'nacion_create',
                            path: 'crear',
                            component: () => import('~/pages/nacion/NacionForm.vue'),
                            meta: { icon: 'icon-park-outline:edit', type: 'nacion', action: 'create', route: 'nacion_create' }
                        }
                    ]
                },
                {
                    path: '/permisos',
                    meta: { label: 'permiso', icon: 'icon-park-outline:tree-list' },

                    children: [
                        {
                            name: 'permiso_list',
                            path: '',
                            component: () => import('~/pages/permiso/PermisoList.vue'),
                            meta: { type: 'permiso', action: 'list', route: 'permiso_collection' }
                        },
                        {
                            name: 'permiso_edit',
                            path: 'edit/:id',
                            component: () => import('~/pages/permiso/PermisoForm.vue'),
                            meta: { icon: 'icon-park-outline:edit', type: 'permiso', action: 'edit', route: 'permiso_edit' }
                        },
                        {
                            name: 'permiso_create',
                            path: 'crear',
                            component: () => import('~/pages/permiso/PermisoForm.vue'),
                            meta: { icon: 'icon-park-outline:edit', type: 'permiso', action: 'create', route: 'permiso_create' }
                        }
                    ]
                },
                {
                    path: '/actions',
                    meta: { label: 'action', icon: 'material-symbols:modeling-outline' },

                    children: [
                        {
                            name: 'action_list',
                            path: '',
                            component: () => import('~/pages/action/ActionList.vue'),
                            meta: { type: 'action', action: 'list', route: 'action_collection' }
                        },
                        {
                            name: 'action_edit',
                            path: 'edit/:id',
                            component: () => import('~/pages/action/ActionForm.vue'),
                            meta: { icon: 'icon-park-outline:edit', type: 'action', action: 'edit', route: 'action_edit' }
                        },
                        {
                            name: 'action_create',
                            path: 'crear',
                            component: () => import('~/pages/action/ActionForm.vue'),
                            meta: { icon: 'icon-park-outline:edit', type: 'action', action: 'create', route: 'action_create' }
                        }
                    ]
                }
            ]
        }
    ]
} satisfies RouterConfig;
