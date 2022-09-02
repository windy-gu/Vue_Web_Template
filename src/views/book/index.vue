<template>
  <div class="smsCodePage-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="手机号码">
        <el-input
            v-model="form.mobile"
            placeholder="请输入手机号码"
            clearable
        ></el-input>
      </el-form-item>
      <el-row>
        <el-button @click="sendSMSCode">发送</el-button>
        <el-button @click="checkSMSCode">查询</el-button>

      </el-row>
    </el-form>

  </div>


</template>

<script>

import {sendSmsCode} from "@/api/book";
import {checkSmsCode} from "@/api/book";

export default {
  data() {
    return {
      form: {
        mobile: ''
      }
    }
  },
  methods: {
    onSubmit() {
    },
    sendSMSCode() {
      sendSmsCode({mobile: this.form.mobile}).then(response => {
        const res = response.data
        if (res.rspInf === 'success') {
          this.$message.success('发送验证码成功')
        } else {
          this.$message.error('发送验证码失败')
        }
      })

    },
    checkSMSCode() {
      checkSmsCode({mobile: this.form.mobile}).then(response => {
        const res = response.data
        if (res.rspInf === 'success') {
          this.$message.success('验证码：' + res.verify_code)
        } else {
          this.$message.error('发送验证码失败')
        }
      })

    },
  }
}
</script>

<style scoped>

</style>
