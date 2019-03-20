import defaultLayout from '@/views/layout/LeftAccordionSidebar/index'

const asyncRouter = {
  path: '/java-code-generator',
  component: defaultLayout,
  hidden: false,
  redirect: '/java-code-generator/execute',
  name: '923c7i98uc6khj109b8930ba20d907j3',
  meta: {
    sortNum: 1,
    roles: [],
    title: '插件',
    icon: 'utils'
  },
  children: [
    {
      path: 'execute',
      component: () => import('@/views/code-generator/main'),
      hidden: false,
      alwaysShow: true,
      name: '723c7698uc6ghj109b8970baf0d008j5',
      meta: {
        sortNum: 2,
        roles: [],
        title: '代码生成器',
        icon: 'java'
      }
    }
  ]
}

export default asyncRouter
