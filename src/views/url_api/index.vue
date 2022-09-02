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
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="Response Body" name="response_body">
                  <json-view :data="form.res_body"/>
                </el-tab-pane>
                <el-tab-pane label="Response Headers" name="response_headers">
                  <json-view :data="form.res_header"/>
                </el-tab-pane>
<!--                <el-tab-pane label="Request Body" name="request_body">-->
<!--                  <json-view :data="form.req_body"/>-->
<!--                </el-tab-pane>-->
<!--                <el-tab-pane label="Request Headers" name="request_headers">-->
<!--                  <json-view :data="form.req_header"/>-->
<!--                </el-tab-pane>-->
              </el-tabs>

            </el-form>
          </el-main>

        </el-container>

      </div>
    </div>


  </div>

</template>

<script>

import {apiExecute} from "@/api/url_api";
import jsonView from 'vue-json-views'
import Vue from "vue";


export default {
  data() {
    return {
      form: {
        url: 'http://127.0.0.1:5001/api/author/list/like',
        body:'{"name":"杨振东"}',
        header:'',
        res_body:{},
        res_header: {}
        // req_body:{},
        // req_header: {}
      },
      activeName: 'response_body'
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    onSubmit() {
    },
    api_execute() {
      apiExecute({url: this.form.url, body:this.form.body}).then(response => {
        console.log(response)
        const res = response.data
        if (res.rspInf === 'success') {
          this.form.res_body = res
          this.form.res_header = response.headers
          // this.form.req_body = response.config.data
          // this.form.req_header = response.config.headers

          this.$message.success('api请求成功')
        } else {
          this.$message.error('api请求失败')
        }
      })

    }
  },
  components: {
    jsonView
  }
}
</script>

<style scoped>

</style>
