    <template>
  <div class="app-container">
    <!-- 添加作者信息按钮 -->
    <el-row :gutter="10" class="mb8">
<!--      <el-col :span="1.5">-->
<!--        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>-->
<!--      </el-col>-->
      <toolbar @search="getAuthorListByID" @reset="reSet" @add="handleAdd" ></toolbar>
    </el-row>
    <br/>
<!--模糊查询-->
    <el-form ref="form" :model="form" label-width="40px">
      <el-form-item label="姓名">
        <el-input
            v-model="form.search_name"
            placeholder="请输入姓名"
            clearable
            maxlength="10"
            show-word-limit
            style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item label="笔名">
        <el-input
            v-model="form.search_pseudonym"
            placeholder="请输入笔名"
            clearable
            maxlength="10"
            show-word-limit
            style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-row>
        <el-button @click="selectByLike">查询</el-button>
      </el-row>
    </el-form>
    <br/>
    <!--作者信息列表 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="pseudonym" label="笔名"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit_author(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delete_author(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <template #empty>
        <div style="line-height: 26px">暂无数据~</div>
      </template>

    </el-table>
    <!--添加作者信息表单-->
    <el-dialog :title="title" :visible.sync="centerDialogVisible" width="50%" center>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item
          prop="name"
          label="作者姓名"
          :rules="[
            { required: true, message: '请输入作者姓名', trigger: 'change' }
          ]"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          prop="pseudonym"
          label="作者笔名"
          :rules="[{ required: true, message: '请输入作者笔名', trigger: 'change' }
          ]"
        >
          <el-input v-model="form.pseudonym"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </span>
    </el-dialog>
    <!--删除 二次确认弹窗-->
    <br>
    <div class="block" type="text-align: right;"  >
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalSize"
          style="text-align:right"
          >
      </el-pagination>
    </div>
  </div>

</template>

<script>
import {
  createAuthorInfo,
  getAuthorInfo,
  getAuthorInfoByPagination,
  selectByLike,
  UpdateAuthor,
  DeleteAuthor,
  getAuthorListById
} from '@/api/author'

export default {
  data() {
    return {
      tableData: [],
      title: '',
      centerDialogVisible: false,

      pageNum: 1,
      pageSize: 10,
      totalSize: '',

      form: {
        name: '',
        pseudonym: '',
        search_name: '',
        search_pseudonym: ''
      }

    }
  },
  mounted() {
    this.selectAuthorInfoByPagination()
  },
  methods: {
    handleAdd() {
      this.title = '添加作者信息'
      this.centerDialogVisible = true
    },
    // 弹窗中的取消按钮事件
    cancel() {
      this.centerDialogVisible = false
      this.reset()
    },
    // 重置表单数据
    reset() {
      this.form = {
        name: '',
        pseudonym: ''
      }
    },
    // 弹窗中的确定按钮,调用接口保存作者信息
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title === '添加作者信息') {
            this.handleCreate()
          } else {
            this.handleUpdate()
          }
          this.centerDialogVisible = false
          // alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除二次确认弹窗
    delete_author(index, row) {
      this.$confirm('此操作将删除该内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form = { ...row }
        this.handleDelete(this.form)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加用户
    handleCreate() {
      createAuthorInfo(this.form).then(response => {
        const res = response.data
        if (res.rspInf === 'success') {
          this.$message.success('添加成功')
          this.selectAuthorInfoByPagination()
        } else {
          this.$message.error('添加失败')
        }
      })
        .catch(err => {
          this.$message.error('服务端异常，添加失败。')
        })
    },

    // 通过姓名、笔名进行模糊查询
    selectByLike() {
      selectByLike({name:this.form.search_name,pseudonym:this.form.search_pseudonym}).then(response => {
        const res = response.data
        if (res.rspInf === 'success') {
          this.$message.success('查询成功')
          this.tableData = res.responseData
        } else {
          this.$message.error('查询失败')

        }
      })
    },
    // 根据用户ID进行查询，若未输入则直接通过分页控件的方式去查询
    getAuthorListByID(searchKey) {
      // debugger
      console.log(searchKey.length)
      if (searchKey.length >= 1) {
        getAuthorListById({id:searchKey}).then(response => {
          const res = response.data
          if (res.rspInf === 'success') {
            this.$message.success('查询成功')
            this.tableData = res.responseData
          } else {
            this.$message.error('查询失败')
          }
        })
          .catch(err => {
            this.$message.error('服务端异常，查询失败。')
          })
      } else {
        this.selectAuthorInfoByPagination()
      }
    },
    // 用户信息更新
    handleUpdate() {
      console.log(this.form)
      UpdateAuthor(this.form).then(response => {
        const res = response.data
        if (res.rspInf === 'success') {
          this.$message.success('更新成功')
          this.selectAuthorInfoByPagination()
        } else {
          this.$message.error('更新失败')
        }
      })
        .catch(err => {
          this.$message.error('服务端异常，更新失败。')
        })
    },

    // 删除用户信息
    handleDelete() {
      DeleteAuthor(this.form).then(response => {
        const res = response.data
        if (res.rspInf === 'success') {
          this.$message.success('删除成功')
          this.selectAuthorInfoByPagination()
        } else {
          this.$message.error('删除失败')
          this.selectAuthorInfoByPagination()
        }
      })
        .catch(err => {
          this.$message.error('删除失败，catch')
          this.selectAuthorInfoByPagination()
        })
    },
    // 获取用户信息
    getAuthorList() {
      getAuthorInfo().then(response => {
        const res = response.data
          if (res.rspInf === 'success') {
            console.log(res.responseData)
            this.tableData = res.responseData
          } else {
            this.$message.error('获取信息失败')
          }
        })
        .catch(err => {
          this.$message.error('服务端异常，请联系管理员解决。')
        })
    },
    selectAuthorInfoByPagination() {
      getAuthorInfoByPagination({pageSize:this.pageSize,pageNum:this.pageNum}).then(response => {
        const res = response.data
        if (res.rspInf === 'success') {
          console.log(res.responseData)
            if (res.responseData === null) {
              this.tableData = res.responseData
            } else {
              this.pageSize = res.pageSize
              this.pageNum = res.pageNum
              this.totalSize = res.total
              this.tableData = res.responseData
            }

        } else {
          this.$message.error('获取信息失败')
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.pageNum = 1;
      this.selectAuthorInfoByPagination()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.selectAuthorInfoByPagination();
    },
    reSet() {
      this.selectAuthorInfoByPagination()
    },
    edit_author(index, row) {
      this.centerDialogVisible = true
      this.title = '编辑作者信息'
      this.form = { ...row }
    }
  }
}

</script>

<style>
</style>
