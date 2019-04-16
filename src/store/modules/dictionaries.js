import * as DictionaryAPI from '@/api/system-management/dictionary'

const dictionaries = {
  state: {
    // 字典是否自动初始化完成
    initCompleted: false,

    trueOrFalse: [{
      key: '',
      value: ''
    }],

    gender: [{
      key: '',
      value: ''
    }],

    dictionaryCategory: [{
      key: '',
      value: ''
    }],

    allMicroService: [{
      key: '',
      value: ''
    }]
  },
  mutations: {
    REFRESH_INIT_COMPLETED: ( state, data ) => {
      state.initCompleted = data
    },
    REFRESH_TRUE_OR_FALSE: ( state, data ) => {
      state.trueOrFalse = data
    },
    REFRESH_GENDER: ( state, data ) => {
      state.gender = data
    },
    REFRESH_DICTIONARY_CATEGORY: ( state, data ) => {
      state.dictionaryCategory = data
    },
    REFRESH_MICRO_SERVICE: ( state, data ) => {
      state.allMicroService = data
    }
  },
  actions: {
    loadBaseSystemDictionary({ commit, state }) {
      if(!state.initCompleted) {
        DictionaryAPI.queryBaseSystemDictionary().then(data => {
          for (let key in data) {
            // REFRESH_TRUE_OR_FALSE, REFRESH_GENDER, REFRESH_DICTIONARY_CATEGORY, REFRESH_MICRO_SERVICE 与后端枚举值是一样的
            commit(key, data[key])
          }
          commit('REFRESH_INIT_COMPLETED', true)
        }).catch(() => {
          commit('REFRESH_INIT_COMPLETED', false)
        })
      }
    }
  }
}
export default dictionaries
