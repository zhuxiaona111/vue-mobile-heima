<template>
  <div class="container">
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 输入框组 -->
    <van-cell-group>
      <van-field @blur="checkMobile" :error-message="MsgForm.mobile" v-model.trim="FormData.mobile" placeholder="请输入手机号码" label="手机号："></van-field>
      <van-field @blur="checkCode" :error-message="MsgForm.code" v-model.trim="FormData.code" placeholder="请输入验证码" label="验证码：">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn-box">
      <van-button @click="login" size="small" type="info" block round>登录</van-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { login } from '@/api/user'
export default {
  name: 'login',
  data () {
    return {
      FormData: {
        mobile: '13911111111',
        code: '246810'
      },
      MsgForm: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    checkMobile () {
      // 校验手机号不能为空
      if (!this.FormData.mobile) {
        this.MsgForm.mobile = '手机号不能为空'
        // 下面代码就不能执行
        return false
      }
      // 校验手机号格式问题
      if (!/^1[3-9]\d{9}$/.test(this.FormData.mobile)) {
        this.MsgForm.mobile = '手机号格式不正确'
        return false
      }
      this.MsgForm.mobile = ''

      return true
    },
    checkCode () {
      if (!this.FormData.code) {
        this.MsgForm.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.FormData.code)) {
        this.MsgForm.code = '验证码必须是6位'
        return false
      }
      this.MsgForm.code = ''
      return true
    },
    ...mapMutations(['updataUser']),
    async login () {
      if (this.checkMobile() && this.checkCode()) {
        console.log('校验成功')
        const data = await login(this.FormData)
        console.log(data)
        this.updataUser({ user: data })
        this.$notify({ type: 'success', message: '登录成功' })
        let { redirectUrl } = this.$route.query
        this.$router.push(redirectUrl || '/')
      }
    }
  }
}
</script>

<style scoped>
.btn-box {
  padding: 20px;
}
</style>
