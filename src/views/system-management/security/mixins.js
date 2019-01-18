export default {
  methods: {
    initForm() {
      return {
        id: null,
        securityDef: null,
        name: '',
        remark: ''
      }
    },
    initRules() {
      return {
        securityDef: [{
          required: true, message: '请输入资源定义', trigger: 'blur'
        }, {
          min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur'
        }],
        name: [{
          required: true, message: '请输入资源名称', trigger: 'blur'
        }, {
          min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }],
        remark: [{
          min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur'
        }]
      }
    }
  }
}
