const dictionaries = {
  state: {
    // 字典是否自动初始化完成
    initCompleted: false,

    trueOrFalse: [{
      key: '0',
      value: '否'
    }, {
      key: '1',
      value: '是'
    }],

    gender: [{
      key: '0',
      value: '女'
    }, {
      key: '1',
      value: '男'
    }],

    dictionaryCategory: [{
      key: '1',
      value: '字典分类'
    }, {
      key: '2',
      value: '单级字典'
    }, {
      key: '3',
      value: '多级字典'
    }],

    allMicroService: [{
      key: '',
      value: ''
    }]
  },
  mutations: {
    // initComplete
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
    // TODO 一次加载所有的字典项
    loadInitComplete({ commit }) {
      commit('REFRESH_INIT_COMPLETED', true)
    },
    loadAllTrueOrFalse({ commit }, data) {
      commit('REFRESH_TRUE_OR_FALSE', data)
    },
    loadAllGender({ commit }, data) {
      commit('REFRESH_GENDER', data)
    },
    loadAllDictionaryCategory({ commit }, data) {
      commit('REFRESH_DICTIONARY_CATEGORY', data)
    },
    // TODO 将API掉你用转移到本文件内
    loadAllMicroService({ commit }, data) {
      commit('REFRESH_MICRO_SERVICE', data)
    }
  }
}
export default dictionaries
