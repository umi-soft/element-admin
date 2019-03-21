/**
 * @param time 可为日期对象（Date） 或者 时间戳（通过parseInt(time) * 1000需要转换为毫秒数）
 * @param format  期望的日期格式，如： '{y}-{m}-{d} {h}:{i}:{s} 星期{a}'
 * @returns 获取指定格式的日期字符串
 * @author hujie@mail.taiji.com.cn
 */
export function parseTime(time, format = '{y}-{m}-{d} {h}:{i}:{s}') {
  if (arguments.length === 0) { // 没传递参数
    return null
  }
  if (!time) {
    return null
  }
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param time 可为日期对象（Date） 或者 时间戳（通过parseInt(time) * 1000需要转换为毫秒数）
 * @param format  期望的日期格式，如： '{y}-{m}-{d} {h}:{i}:{s} 星期{a}'
 * @returns 获取指定格式的日期字符串 或 计算距离当前时间的时间差描述（刚刚、XX分钟前、XX小时前）
 * @author hujie@mail.taiji.com.cn
 */
export function formatTime(time, format) {
  if (time.toString().length !== 13) {
    time = time * 1000
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff > 3600 * 24 * 7 || format) { // 一个月以上或传递了格式，采用标准日期格式化方式处理
    return parseTime(time, format)
  } else if (diff > 3600 * 24 * 3) {
    return '3天前'
  } else if (diff > 3600 * 24 * 2) {
    return '2天前'
  } else if (diff > 3600 * 24 * 1) {
    return '1天前'
  } else if (diff > 3600) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff > 60) {
    return Math.ceil(diff / 60) + '分钟前'
  } else {
    return '刚刚'
  }
}

/**
 *
 * @param actual 需要清理的数组
 * @returns 清理数据中不存在的数据,如undefined、null以及空字符串
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param arr 原始数组
 * @returns 返回一个去重的新数组
 */
export function getUniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @param json
 * @returns 将JSON对象转换为url查询字符串
 */
export function obj2Param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param url
 * @returns 从url中获取查询字符串并转换为JSON对象
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

/**
 * @param val
 * @returns 将html转换为字符串
 */
export function html2Text(inner) {
  const div = document.createElement('div')
  div.innerHTML = inner
  return div.textContent || div.innerText
}

/**
 * @param source 被复制的对象
 * @returns 深度复制对象，新对象与原始对象不存在引用关系
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('source不是对象，值为 = ' + source)
  }
  const targetObj = Array.isArray(source) ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param target
 * @param source
 * @returns 合并对象属性，将source合并给target，若source为数组，则返回source的数组新副本
 */
export function deepMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice() // slice产生数组新副本
  }
  if (source === null || source === undefined) {
    return source
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = deepMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * 深度合并对象，仅仅合并target已有的属性
 * @param target
 * @param source
 * @returns {*}
 */
export function deepMergeLeft(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice() // slice产生数组新副本
  }
  if (source === null || source === undefined) {
    return source
  }
  Object.keys(target).forEach(property => {
    if (Object.prototype.toString.call(target[property]) === '[object Object]') {
      target[property] = deepMergeLeft(target[property], source[property])
    } else if (Object.prototype.toString.call(source[property]) === '[object Object]') {
      target[property] = deepMerge({}, source[property])
    } else if (Object.prototype.toString.call(source[property]) === '[object Array]') {
      target[property] = source[property].slice()
    } else {
      target[property] = source[property]
    }
  })
  return target
}

/**
 * 为了moke模糊查询方便
 * 从数组中模糊查询获得匹配的子集
 * 全字段匹配
 * @param array
 * @param querys  ['hujie', '一路向北', '5349691']
 * @returns {*}
 */
export function fullQueryLike(array, ...querys) {
  return array.filter(item => {
    return Object.values(item).some(value => {
      return querys.some(query => {
        return new RegExp(query + '').test(value)
      })
    })
  })
}

/**
 * 为了moke模糊查询方便
 * 从数组中模糊查询获得匹配的子集
 * 根据字段属性模糊匹配 and关系
 * @param array
 * @param query  {name: 'hujie', qq: '5349691'}
 * @returns {*}
 */
export function fieldQueryLike(array, query) {
  const keys = Object.keys(query)
  return array.filter(item => {
    return keys.every(key => {
      if (query[key] === null || query[key] === undefined || query[key] === '') {
        return true
      }
      return new RegExp(query[key] + '').test(item[key] + '')
    })
  })
}

/**
 * @param array 数组
 * @param sort 仅仅支持非对象类型的字段，反之报错
 * @param isDesc  是否desc排序
 * @returns {*}
 */
export function sortArray(array, sort, isDesc) {
  return array.sort((a, b) => { return isDesc && a[sort] - b[sort] })
}

/**
 * 添加或删除元素class属性
 * @param element 目标元素dom对象
 * @param className 需要添加或删除的class值，若存在，则删除，反之则添加
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += ' ' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }
]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * 延时执行函数，长用于第三方组件与VUE无法完美集成时，入Echarts，两者的渲染存在时间差
 * @param func 延时执行的函数
 * @param wait  延时周期
 * @param immediate 是否立即执行
 * @returns {function(...[*]=): *}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * 创建唯一ID
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 给tree结构中增加一个新节点,注意，该方法不考虑插入节点顺序问题，只追加在末尾处
 * @param node 需要新增进入的节点
 * @param nodes tree数据
 * @param id 表明tree的唯一标识的key值
 * @param parentId 表明tree的上下级关系的key值
 * @param children 表明tree节点子节点数组的key值
 */
export function addNode2Tree(node, nodes, isElementNode = true, id = 'id', parentId = 'parentId', children = 'children') {
  for (let i = 0; i < nodes.length; i++) {
    let nodeV = nodes[i];
    if (isElementNode) {
      nodeV = nodes[i].data
    }
    if (!nodeV[children]) {
      nodeV[children] = []
    }
    if (nodeV[id] === node[parentId]) {
      nodeV[children].push(node)
      return
    } else {
      for (let j = 0; j < nodeV[children].length; j++) {
        addNode2Tree(node, nodeV[children], id, parentId, children)
      }
    }
  }
}
