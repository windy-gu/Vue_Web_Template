<template>
  <div class="smsCodePage-container">
    <el-input
        v-model="input"
        placeholder="请输入手机号码"
        clearable
    ></el-input>
    <el-row>
      <el-button>发送</el-button>
      <el-button>查询</el-button>

    </el-row>

  </div>


</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>

</style>
