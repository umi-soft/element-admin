import * as DictionaryAPI from '@/api/system-management/dictionary'

export default {
  methods: {
    initRules() {
      return {
        state: [{
          required: true, message: '请选择字典启用状态', trigger: 'blur'
        }],
        type: [{
          required: true, message: '请选择字典类型', trigger: 'change'
        }],
        name: [{
          required: true, message: '请输入字典名称', trigger: 'blur'
        }, {
          min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }],
        index: [{
          required: true, message: '请输入字典编号', trigger: 'blur'
        }]
      }
    },
    queryAllDictionaryType() {
      DictionaryAPI.queryAllDictionaries({
        filters: [],
        sorts: []
      }).then((list) => {
        this.list = list
      }, () => {
        this.list = []
      })
    }
  }
}
