export default {
  methods: {
    initForm() {
      return {
        id: null,
        token: null,
        parentId: null,
        state: 1,
        category: 1,
        type: '',
        name: '',
        code: '',
        index: '',
        remark: ''
      }
    },
    initRules() {
      return {
        state: [{
          required: true, message: '请选择字典分类启用状态', trigger: 'blur'
        }],
        name: [{
          required: true, message: '请输入字典分类名称', trigger: 'blur'
        }, {
          min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }],
        index: [{
          required: true, message: '请输入字典分类编号', trigger: 'blur'
        }]
      }
    }
  }
}
