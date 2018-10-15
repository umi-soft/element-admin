/** When your routing table is too long, you can split it into small modules**/

import defaultLayout from '@/views/layout/default/index'
import Submenu from '@/views/layout/submenu/index'

// name值即为后端ID，请使用http://www.uuid.online/ 在前端生成，后端只允许做同步操作

const asyncRouter = {
  path: '/system',
  component: defaultLayout,
  // redirect: 'noredirect',
  hidden: false,
  alwaysShow: true,
  name: '90a127ce319d5d93b3b49c697cfa138f',
  meta: {
    index: 1,
    roles: [],
    title: '系统管理',
    icon: 'setting',
    cacheAble: false
  },
  children: [
    {
      path: 'dept',
      component: () => import('@/views/system-management/dept/main'),
      // redirect: 'noredirect',
      hidden: false,
      alwaysShow: true,
      name: '323c76618c6b56109bd490baf0d00902',
      meta: {
        index: 1,
        roles: [],
        title: '部门管理',
        icon: 'dept',
        cacheAble: false
      }
    },
    {
      path: 'user-group',
      component: Submenu,
      // redirect: 'noredirect',
      hidden: false,
      alwaysShow: true,
      name: 'f33d83225bef590d81f61a5afcbbca14',
      meta: {
        index: 1,
        roles: [],
        title: '用户与分组',
        icon: 'user-setting',
        cacheAble: false
      },
      children: [
        {
          path: 'group',
          component: () => import('@/views/system-management/group/main'),
          // redirect: 'noredirect',
          hidden: false,
          alwaysShow: true,
          name: '3de22ff390ab5d06bafcce547ff780bb',
          meta: {
            index: 1,
            roles: [],
            title: '用户分组',
            icon: 'user-group',
            cacheAble: false
          }
        },
        {
          path: 'user',
          component: () => import('@/views/system-management/user/main'),
          // redirect: 'noredirect',
          hidden: false,
          alwaysShow: true,
          name: '8bdc5038a6585fd2b5d3ef7b1e4bf4e1',
          meta: {
            index: 1,
            roles: [],
            title: '用户管理',
            icon: 'user',
            cacheAble: false
          }
        }
      ]
    },
    {
      path: 'menu',
      component: () => import('@/views/system-management/menu/main'),
      // redirect: 'noredirect',
      hidden: false,
      alwaysShow: true,
      name: '6ecb9fd6e70f50b2be035485928b5cd6',
      meta: {
        index: 1,
        roles: [],
        title: '菜单管理',
        icon: 'auth-menu',
        cacheAble: false
      }
    },
    {
      path: 'role',
      component: () => import('@/views/system-management/role/main'),
      // redirect: 'noredirect',
      hidden: false,
      alwaysShow: true,
      name: 'd2249f50a3235286b173663a6c45122d',
      meta: {
        index: 1,
        roles: [],
        title: '角色管理',
        icon: 'user-role',
        cacheAble: false
      }
    },
    {
      path: 'dictionary-setting',
      component: Submenu,
      // redirect: 'noredirect',
      hidden: false,
      alwaysShow: true,
      name: 'da4c2695c36a50eab041735842b530e7',
      meta: {
        index: 1,
        roles: [],
        title: '字典管理',
        icon: 'dictionary-setting',
        cacheAble: false
      },
      children: [
        {
          path: 'dictionary-type',
          component: () => import('@/views/system-management/dictionary-type/main'),
          // redirect: 'noredirect',
          hidden: false,
          alwaysShow: true,
          name: 'd9fab44477ba5d2caf1aab1b95281713',
          meta: {
            index: 1,
            roles: [],
            title: '字典分类',
            icon: 'dictionary-type',
            cacheAble: false
          }
        },
        {
          path: 'dictionary',
          component: () => import('@/views/system-management/dictionary/main'),
          // redirect: 'noredirect',
          hidden: false,
          alwaysShow: true,
          name: '22fc466264e65171a7631b2079a2b7f6',
          meta: {
            index: 1,
            roles: [],
            title: '业务字典',
            icon: 'dictionary',
            cacheAble: false
          }
        }
      ]
    }
  ]
}

export default asyncRouter
