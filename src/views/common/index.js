import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /[A-Za-z]\w+\.vue$/
)

const components = {}

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  fileName = (fileName.split('/'))[fileName.split('/').length - 1]

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 排出子目录
      // 结尾的扩展名
      fileName.replace('.vue', '')
    )
  )

  // 如果这个组件选项是通过 `export default` 导出的，
  // 那么就会优先使用 `.default`，
  // 否则回退到使用模块的根。
  components[componentName] = componentConfig.default || componentConfig
})

export default components
