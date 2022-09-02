<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
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
