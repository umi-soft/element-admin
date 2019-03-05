<template>
  <div class="login-container">

    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">UMI-SOFT</h3>
      </div>

      <el-form-item prop="loginName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.loginName"
          placeholder="请填写用户名"
          name="loginName"
          type="text"
          auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          placeholder="请填写密码"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item prop="captcha">
        <span class="svg-container">
          <svg-icon icon-class="captcha" />
        </span>
        <el-input
          v-model="loginForm.captcha"
          type="text"
          placeholder="请填写验证码"
          name="captcha"
          auto-complete="on"
          @keyup.enter.native="handleLogin" />
        <span class="captcha">
          <img :src="captchaBase64" style="width: 100%; height: 100%;" @click="getCaptcha">
        </span>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登陆</el-button>

    </el-form>
  </div>
</template>

<script>
import UUID from 'es6-uuid'
import * as LoginAPI from '@/api/login'

export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value && value.length < 5) {
        callback(new Error())
      } else {
        callback()
      }
    }
    const remoteValidator = (rule, value, callback) => {
      if ('' + this.remoteError === '3' && rule.field === 'password') {
        callback(new Error())
      } else if ('' + this.remoteError === '2' && rule.field === 'captcha') {
        callback(new Error())
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        captcha: null
      },
      loginRules: {
        loginName: [{ required: true, trigger: 'change', message: '请填写用户名' }],
        password: [{ required: true, trigger: 'change', message: '请填写密码' }, { validator: validatePassword, trigger: 'change', message: '请输入密码（至少5位）' }, { validator: remoteValidator, trigger: 'change', message: '用户名或密码错误' }],
        captcha: [{ required: true, trigger: 'change', message: '请填写验证码' }, { validator: remoteValidator, trigger: 'change', message: '验证码错误' }]
      },
      remoteError: null,
      captchaBase64: null,
      passwordType: 'password',
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.getCaptcha()
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    getCaptcha() {
      LoginAPI.captcha({ uuid: UUID(32) }).then(data => {
        this.captchaBase64 = data
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          LoginAPI.loginByLoginName(this.loginForm).then(data => {
            if ('' + data.result === '1') {
              this.$store.dispatch('LoginByLoginName', data.token)
              this.$router.push({ path: this.redirect || '/' })
            } else if ('' + data.result === '2') { // 验证码错误
              this.remoteError = data.result
              this.getCaptcha()
              this.$refs.loginForm.validateField('captcha', () => {
                this.remoteError = null
              })
            } else if ('' + data.result === '3') { // 用户名或密码错误
              this.remoteError = data.result
              this.getCaptcha()
              this.$refs.loginForm.validateField('password', () => {
                this.remoteError = null
              })
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */

  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .captcha {
    position: absolute;
    right: 10px;
    top: 3px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
    display: inline-block;
    width: 200px;
    height: 40px;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
