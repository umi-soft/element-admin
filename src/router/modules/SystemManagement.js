/** When your routing table is too long, you can split it into small modules**/

import defaultLayout from '@/views/layout/default/index'
import Submenu from '@/views/layout/submenu/index'

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
      }
    },
    {
      path: 'user-group',
      component: Submenu,
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
            noCache: false
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
      }
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
      }
    },
    {
      path: 'dictionary-setting',
      component: Submenu,
      redirect: 'noredirect',
      name: 'dictionary-setting',
      meta: {
        roles: [],
        title: '字典管理',
        icon: 'dictionary-setting',
        noCache: false
      },
      children: [
        {
          path: 'dictionary-type',
          component: () => import('@/views/system-management/dictionary-type/main'),
          hidden: false,
          name: 'dictionary-type',
          meta: {
            roles: [],
            title: '字典分类',
            icon: 'dictionary-type',
            noCache: false
          }
        },
        {
          path: 'dictionary',
          component: () => import('@/views/system-management/dictionary/main'),
          name: 'dictionary',
          meta: {
            roles: [],
            title: '业务字典',
            icon: 'dictionary',
            noCache: false
          }
        }
      ]
    }
  ]
}

export default asyncRouter
