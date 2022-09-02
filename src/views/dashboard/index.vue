<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您：{{ name }}</div>
    <div>
      <el-link
               target="_blank"
               :underline="false">常用测试页面快捷跳转</el-link>
    </div>
    <div>
      <el-link href="http://chromedriver.storage.googleapis.com/index.html"
               target="_blank"
               icon="el-icon-link"
               :underline="false">Selenium WebDriver</el-link>
    </div>
    <div>
      <el-link href="https://element.eleme.cn/#/zh-CN/component/tag"
               target="_blank"
               icon="el-icon-link"
               :underline="false">Element组件</el-link>
    </div>
    <div>
      <el-link href="http://www.metools.info/code/c82.html"
               target="_blank"
               icon="el-icon-link"
               :underline="false">RSA加密工具</el-link>
    </div>
    <div>
      <el-link href="https://tool.lu/timestamp/"
               target="_blank"
               icon="el-icon-link"
               :underline="false">时间戳工具</el-link>
    </div>
    <div>
      <el-link href="https://tool.chinaz.com/tools/urlencode.aspx?qq-pf-to=pcqq.discussion"
               target="_blank"
               icon="el-icon-link"
               :underline="false">URL编码/解码</el-link>
    </div>
    <div>
      <el-link href="https://cron.qqe2.com/"
               target="_blank"
               icon="el-icon-link"
               :underline="false">在线Cron表达式生成器</el-link>
    </div>
  </div>


</template>

<script>
import { getUserInfo } from '@/api/user'

export default {
  data() {
    return {
      name: ''
      }
    },
  mounted() {
    this.queryUserInfo()
  },
  methods: {
    queryUserInfo() {
      var user = sessionStorage.getItem('user')
      getUserInfo({username:user}).then(response => {
        const res = response.data
        if (res.rspInf === 'success') {
          sessionStorage.setItem('avatar', res.avatar)
          this.name = user
        } else {
          this.$message.error('查询用户失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
