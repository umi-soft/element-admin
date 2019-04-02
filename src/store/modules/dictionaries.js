const dictionaries = {
  state: {
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
    REFRESH_MICRO_SERVICE: ( state, data ) => {
      state.allMicroService = data
    }
  },
  actions: {
    loadAllMicroService({ commit }, data) {
      commit('REFRESH_MICRO_SERVICE', data)
    }
  }
}
export default dictionaries
