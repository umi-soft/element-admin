/** When your routing table is too long, you can split it into small modules**/

import defaultLayout from '@/views/layout/default/index'
import submenu from '@/views/layout/submenu/index'

const asyncRouter = {
  path: '/system',
  component: defaultLayout,
  redirect: 'noredirect',
  name: 'system',
  meta: {
    roles: [],
    title: '系统管理',
    icon: 'setting'
  },
  children: [
    {
      path: 'dept',
      component: () => import('@/views/system-management/dept/main'),
      hidden: false,
      name: 'dept',
      meta: {
        roles: [],
        title: '部门管理',
        icon: 'dept',
        noCache: false
      },
      children: [
        {
          path: 'check',
          component: () => import('@/views/system-management/dept/check'),
          name: 'dept-check',
          hidden: true,
          redirect: 'noredirect',
          meta: {
            roles: [],
            title: '查看部门',
            icon: 'check',
            noCache: false
          }
        },
        {
          path: 'add',
          component: () => import('@/views/system-management/dept/edit'),
          name: 'dept-add',
          hidden: true,
          redirect: 'noredirect',
          meta: {
            roles: [],
            title: '新增部门',
            icon: 'add',
            noCache: false
          }
        },
        {
          path: ':id/edit',
          component: () => import('@/views/system-management/dept/edit'),
          name: 'dept-edit',
          hidden: true,
          redirect: 'noredirect',
          meta: {
            roles: [],
            title: '编辑部门',
            icon: 'edit',
            noCache: false
          }
        },
        {
          path: 'dept-del',
          component: null,
          name: 'dept-del',
          hidden: true,
          redirect: 'noredirect',
          meta: {
            roles: [],
            title: '删除部门',
            icon: 'del',
            noCache: false
          }
        }
      ]
    },
    {
      path: 'user-group',
      component: submenu,
      redirect: 'noredirect',
      name: 'user-setting',
      meta: {
        roles: [],
        title: '用户与分组',
        icon: 'user-setting',
        noCache: false
      },
      children: [
        {
          path: 'user',
          component: () => import('@/views/system-management/user/main'),
          name: 'user',
          meta: {
            roles: [],
            title: '用户管理',
            icon: 'user',
            noCache: false
          }
        },
        {
          path: 'group',
          component: () => import('@/views/system-management/group/main'),
          hidden: false,
          name: 'user-group',
          meta: {
            roles: [],
            title: '用户分组',
            icon: 'user-group',
            noCache: false,
            buttons: [
              {
                name: '查看'
              },
              {
                name: '新增'
              },
              {
                name: '编辑'
              },
              {
                name: '删除'
              }
            ]
          }
        }
      ]
    },
    {
      path: 'menu',
      component: () => import('@/views/system-management/menu/main'),
      hidden: false,
      name: 'menu',
      meta: {
        roles: [],
        title: '菜单管理',
        icon: 'auth-menu',
        noCache: false
      },
      children: [
        {
          path: ':id/check',
          component: () => import('@/views/system-management/menu/check'),
          name: 'menu-check',
          hidden: true,
          redirect: 'noredirect',
          meta: {
            roles: [],
            title: '查看URL映射',
            icon: 'check',
            noCache: false
          }
        },
        {
          path: ':id/edit',
          component: () => import('@/views/system-management/menu/edit'),
          name: 'menu-edit',
          hidden: true,
          redirect: 'noredirect',
          meta: {
            roles: [],
            title: '编辑URL映射',
            icon: 'edit',
            noCache: false
          }
        },
        {
          path: 'menu-sync',
          component: null,
          name: 'menu-sync',
          hidden: true,
          redirect: 'noredirect',
          meta: {
            roles: [],
            title: '同步菜单',
            icon: 'sync',
            noCache: false
          }
        }
      ]
    },
    {
      path: 'role',
      component: () => import('@/views/system-management/role/main'),
      hidden: false,
      name: 'role',
      meta: {
        roles: [],
        title: '角色管理',
        icon: 'user-role',
        noCache: false
      },
      children: [
        {
          path: ':id/check',
          component: () => import('@/views/system-management/role/check'),
          name: 'role-check',
          hidden: true,
          redirect: 'noredirect',
          meta: {
            roles: [],
            title: '查看角色',
            icon: 'check',
            noCache: false
          }
        },
        {
          path: 'add',
          component: () => import('@/views/system-management/role/edit'),
          name: 'role-add',
          hidden: true,
          redirect: 'noredirect',
          meta: {
            roles: [],
            title: '新增角色',
            icon: 'add',
            noCache: false
          }
        },
        {
          path: ':id/edit',
          component: () => import('@/views/system-management/role/edit'),
          name: 'role-edit',
          hidden: true,
          redirect: 'noredirect',
          meta: {
            roles: [],
            title: '编辑角色',
            icon: 'edit',
            noCache: false
          }
        },
        {
          path: 'role-del',
          component: null,
          name: 'role-del',
          hidden: true,
          redirect: 'noredirect',
          meta: {
            roles: [],
            title: '删除角色',
            icon: 'del',
            noCache: false
          }
        }
      ]
    }
  ]
}

export default asyncRouter
