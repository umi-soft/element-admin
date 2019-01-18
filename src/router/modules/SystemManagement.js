/** When your routing table is too long, you can split it into small modules**/

import defaultLayout from '@/views/layout/LeftAccordionSidebar/index'
import MenuGroup from '@/views/layout/MenuGroup/index'

// name值即为后端ID，请使用http://www.uuid.online/ 在前端生成，后端只允许做同步操作

const asyncRouter = {
  path: '/system',
  component: defaultLayout,
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
      component: MenuGroup,
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
          query: {
            category: 1
          },
          hidden: false,
          alwaysShow: true,
          name: '3de22ff390ab5d06bafcce547ff780bb',
          meta: {
            index: 1,
            roles: [],
            title: '用户分组',
            icon: 'group',
            cacheAble: false
          }
        },
        {
          path: 'user',
          component: () => import('@/views/system-management/user/main'),
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
      path: 'menu-setting',
      component: MenuGroup,
      hidden: false,
      alwaysShow: true,
      name: '9fd0d16c3f454636a8b8f1444c1a3c93',
      meta: {
        index: 1,
        roles: [],
        title: '菜单与资源',
        icon: 'menu-setting',
        cacheAble: false
      },
      children: [
        {
          path: 'security',
          component: () => import('@/views/system-management/security/main'),
          hidden: false,
          alwaysShow: true,
          name: '7ff5ba3af6c2463296dd0eb5ecedb23c',
          meta: {
            index: 1,
            roles: [],
            title: '资源管理',
            icon: 'security',
            cacheAble: false
          }
        },
        {
          path: 'menu',
          component: () => import('@/views/system-management/menu/main'),
          hidden: false,
          alwaysShow: true,
          name: '3d2b85978d4c43edb9a7f7396b15d32f',
          meta: {
            index: 1,
            roles: [],
            title: '菜单管理',
            icon: 'menu',
            cacheAble: false
          }
        }
      ]
    },
    {
      path: 'role-group',
      component: MenuGroup,
      hidden: false,
      alwaysShow: true,
      name: 'd4a808c28d2c44159fb7cb47e6d524a5',
      meta: {
        index: 1,
        roles: [],
        title: '角色与分组',
        icon: 'role-setting',
        cacheAble: false
      },
      children: [
        {
          path: 'group',
          component: () => import('@/views/system-management/group/main'),
          query: {
            category: 2
          },
          hidden: false,
          alwaysShow: true,
          name: '81cb5f5db7d141f9bad227ab0c0bc5c9',
          meta: {
            index: 1,
            roles: [],
            title: '角色分组',
            icon: 'group',
            cacheAble: false
          }
        },
        {
          path: 'role',
          component: () => import('@/views/system-management/role/main'),
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
        }
      ]
    },
    {
      path: 'dictionary-setting',
      component: MenuGroup,
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
          path: 'dictionary-single',
          component: () => import('@/views/system-management/dictionary/singleMain'),
          hidden: false,
          alwaysShow: true,
          name: '22fc466264e65171a7631b2079a2b7f6',
          meta: {
            index: 2,
            roles: [],
            title: '单级业务字典',
            icon: 'dictionary-single',
            cacheAble: false
          }
        },
        {
          path: 'dictionary-multi',
          component: () => import('@/views/system-management/dictionary/multiMain'),
          hidden: false,
          alwaysShow: true,
          name: 'd9369152df124e1aae855f743d3eedc8',
          meta: {
            index: 3,
            roles: [],
            title: '多级业务字典',
            icon: 'dictionary-multi',
            cacheAble: false
          }
        }
      ]
    }
  ]
}

export default asyncRouter
