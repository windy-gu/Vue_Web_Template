<template>
  <div class="apiExecutePage-container">
    <div class="apiEditor">
      <!--   左侧区域   -->
      <div class="apiEditor-left" >

      </div>

      <!--   右侧区域   -->
      <div class="apiEditor-right" >
        <el-container style="height: 500px; border: 1px solid #eee">
          <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
          </el-aside>

          <el-main width="400px">
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="请求URL">
                <el-input
                    v-model="form.url"
                    placeholder="请输入请求URL地址"
                    clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="请求body">
                <el-input type="textarea" v-model="form.body"></el-input>
              </el-form-item>
              <el-form-item label="请求header">
                <el-input type="textarea" v-model="form.header"></el-input>
              </el-form-item>
              <el-row>
                <el-button @click="api_execute">执行</el-button>

              </el-row>

              <el-form-item label="响应body">
                <!--        <el-input type="textarea" v-model="form.jsonData"></el-input>-->
                <json-viewer :value="form.jsonData"></json-viewer>
              </el-form-item>
              <el-form-item label="响应header">
                <json-viewer :value="form.res_header"></json-viewer>
                <!--        <el-input type="textarea" v-model="form.res_header"></el-input>-->
              </el-form-item>
            </el-form>
          </el-main>

        </el-container>

      </div>
    </div>


  </div>

</template>

<script>

import {apiExecute} from "@/api/url_api";
import Vue from "vue";


export default {
  data() {
    return {
      form: {
        url: 'http://127.0.0.1:5001/api/author/list/like',
        body:'{"name":"杨振东"}',
        header:'',
        jsonData:'',
        res_header:''
      }
    }
  },
  methods: {
    onSubmit() {
    },
    api_execute() {
      apiExecute({url: this.form.url, body:this.form.body}).then(res => {
        if (res.rspInf === 'success') {
          this.form.jsonData = res

          this.form.res_header = res.headers
          console.log('----------')
          console.log(res.headers)
          console.log('----------')
          this.$message.success('api请求成功')
        } else {
          this.$message.error('api请求失败')
        }
      })

    }
    // api_execute() {
    //   Vue.http.post(this.form.url, this.form.body).then(res => {
    //     if (res.rspInf === 'success') {
    //       this.form.res_body = res.responseData
    //       this.$message.success('api请求成功')
    //     } else {
    //       this.$message.error('api请求失败')
    //     }
    //   })
    //
    // }
  }
}
</script>

<style scoped>

</style>
