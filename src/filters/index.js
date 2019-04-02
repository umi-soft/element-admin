import StoreDictionaries from '@/store/modules/dictionaries'

// set function parseTime,formatTime to filter
export { parseTime, formatTime } from '@/utils'

/**
 * @param number
 * @param prefix 单位 ，如minute
 * @param suffix 复数单位结尾，默认是's'
 * @returns 为数值增加单位
 */
function pluralize(number, prefix, suffix = 's') {
  if (number === 1) {
    return number + prefix
  }
  return number + prefix + suffix
}

/**
 * @param date 秒数（通常为后端时间戳）或Date对象
 * @returns {计算与当前时间差，并增加单位}
 */
export function timeAgo(date) {
  let time = date
  if (typeof date === 'object') {
    time = date.getTime() / 1000
  }
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 *
 * @param num
 * @param digits
 * @returns {string} 数字格式化
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function translateDictionary(key, dictionaries) {
  const index = dictionaries.findIndex(item => { return '' + key === item.key + '' })
  return index === -1 ? '' : dictionaries[index].value
}

export function translateTrueOrFalse(state) {
  const dictionaries = StoreDictionaries.state.trueOrFalse
  const index = dictionaries.findIndex(item => { return '' + state === item.key + '' })
  return index === -1 ? '' : dictionaries[index].value
}

export function translateGender(state) {
  const dictionaries = StoreDictionaries.state.gender
  const index = dictionaries.findIndex(item => { return '' + state === item.key + '' })
  return index === -1 ? '' : dictionaries[index].value
}

export function translateDicCategory(category) {
  const dictionaries = StoreDictionaries.state.dictionaryCategory
  const index = dictionaries.findIndex(item => { return '' + category === item.key + '' })
  return index === -1 ? '' : dictionaries[index].value
}
