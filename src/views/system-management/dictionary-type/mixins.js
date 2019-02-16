export default {
  methods: {
    initForm() {
      return {
        id: null,
        token: null,
        parentId: null,
        category: 1,
        type: '',
        name: '',
        code: '',
        sortNum: '',
        remark: ''
      }
    },
    initRules() {
      return {
        name: [{
          required: true, message: '请输入字典分类名称', trigger: 'blur'
        }, {
          min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }],
        sortNum: [{
          required: true, message: '请输入字典分类编号', trigger: 'blur'
        }]
      }
    }
  }
}
