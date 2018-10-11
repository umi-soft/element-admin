import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * Layout，建议在一级路由中应用不同的布局
 */
import defaultLayout from '@/views/layout/default/index'

/* 模块化路由 */
import systemManagementRouter from './modules/SystemManagement'

/**
 * 静态路由定义，无需权限的全局路由
 * @type {*[]}
 */
export const constantRouterMap = [
  {
    path: '/redirect', // 通常用于刷新当前路由，可参见tagsView中的案例
    component: defaultLayout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/components/Redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/components/ErrorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/components/ErrorPage/401'),
    hidden: true
  },
  {
    path: '/me',
    component: defaultLayout,
    hidden: true,
    children: [
      {
        path: ':id',
        component: () => import('@/views/system-management/user/edit'),
        name: 'edit-me',
        meta: { title: '个人信息编辑', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '',
    component: defaultLayout,
    redirect: 'index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/dashboard/index'),
        name: 'index',
        meta: { title: '首页', icon: 'index', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

/**
 * 聚合子模块路由对象，登陆后异步匹配路由结构，动态添加路由
 * 建议，该动态路由表由前端控制
 */
export const asyncRouterMap = [
  systemManagementRouter,
  { path: '*', redirect: '/404', hidden: true }
]
