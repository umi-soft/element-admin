import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * Layout，建议在一级路由中应用不同的布局
 */
import defaultLayout from '@/views/layout/LeftAccordionSidebar/index'

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
    path: '/myself',
    component: defaultLayout,
    hidden: true,
    meta: { title: '个人设置', icon: 'user', cacheAble: true },
    children: [
      {
        path: 'modify',
        component: () => import('@/views/system-management/user/myself/modify'),
        name: 'myself-modify',
        meta: { title: '个人信息编辑', icon: 'user', cacheAble: true }
      }
    ]
  },
  {
    path: '',
    component: defaultLayout,
    hidden: false,
    redirect: 'index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/dashboard/index'),
        name: 'index',
        meta: { title: '首页', icon: 'index', cacheAble: true }
      }
    ]
  }
]

export default new Router({
  routes: constantRouterMap
})

/**
 * 聚合子模块路由对象，登陆后异步匹配路由结构，动态添加路由
 * 建议，该动态路由表由前端控制
 * asyncRouterMap动态够钱过程中，请在最后末尾处加上路由 ： { path: '*', redirect: '/404', hidden: true }，将未知路由归置到404页面, 详见src/store/modules/permission.js
 */
export const asyncRouterMap = [
  systemManagementRouter
]

export const asyncMenuMap = JSON.parse(JSON.stringify(asyncRouterMap))
