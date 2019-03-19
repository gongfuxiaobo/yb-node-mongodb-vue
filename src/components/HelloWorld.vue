<template>
  <div class="content">
    <div>
      <el-button type="primary" @click="addUserMessage">添加用户</el-button>
    </div>
    <el-table ref="multipleTable" :data="user.list" border class="mt15">
      <el-table-column prop="userName" label="用户名" align="center" />
      <el-table-column prop="name" label="姓名" align="center" />
      <el-table-column prop="sex" label="性别" align="center">
        <template slot-scope="scope">
          <span>{{ getStatusLabel(select.sex, scope.row.sex) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center" />
      <el-table-column prop="address" label="地址" align="center" />
      <el-table-column label="班级" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.student }}班</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span>{{ getStatusLabel(select.status, scope.row.status) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="updateUserMessage(scope.row)">编辑</el-button>
          <el-button type="text" @click="removeUserMessage(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class='mt15'>
      <pagination :current-page="user.pageNum" :page-size="user.pageSize" :total="user.totalSize" :page-sizes="user.sizes" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
    </div>

    <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" :lock-scroll="true" title="用户" width="30%">
      <el-form ref="ruleForm" :model="menuData" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="用户名：" prop="userName">
          <el-input v-if="operationType === 1" v-model.trim="menuData.userName" placeholder="请输入用户名" maxlength="16" />
          <p v-else>{{ menuData.userName }}</p>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-if="operationType !== 3" v-model.trim="menuData.name" placeholder="请输入姓名" maxlength="10" />
          <p v-else>{{ menuData.name }}</p>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-radio-group v-if="operationType !== 3" v-model="menuData.sex" placeholder="请选择性别">
            <el-radio v-for="item in select.sex" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
          <p v-else>{{ menuData.sex }}</p>
        </el-form-item>
        <el-form-item label="年龄：" prop="age">
          <el-input v-if="operationType !== 3" v-model.trim="menuData.age" placeholder="请输入年龄" maxlength="3" />
          <p v-else>{{ menuData.age }}</p>
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-input v-if="operationType !== 3" v-model.trim="menuData.address" placeholder="请输入地址" maxlength="50" />
          <p v-else>{{ menuData.address }}</p>
        </el-form-item>
        <el-form-item label="班级：" prop="student">
          <el-select v-if="operationType !== 3" v-model="menuData.student" placeholder="请选择班级" class="select_box">
            <el-option v-for="item in select.student" :key="item" :label="item + '班'" :value="item" />
          </el-select>
          <p v-else>{{ menuData.student }}班</p>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getUser, addUser, updateUser, removeUser } from '@/services/user'
import { Loading } from 'element-ui'
import Pagination from '@/components/pagination'

export default {
  name: 'HelloWorld',
  components: {
    Pagination
  },
  data () {
    return {
      select: {
        status: [
          {
            label: '启用',
            value: true
          },
          {
            label: '禁用',
            value: false
          }
        ],
        sex: [
          {
            label: '男',
            value: 1
          },
          {
            label: '女',
            value: 2
          }
        ],
        student: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      },
      user: {
        list: [],
        pageSize: 10,
        pageNum: 1,
        totalSize: 1,
        sizes: [10, 30, 50]
      },
      menuData: {},
      operationType: 1,
      dialogVisible: false,
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        student: [{ required: true, message: '请选择班级', trigger: 'change' }],
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      }
    }
  },
  mounted: function () {
    this.getUserList()
  },
  methods: {
    // 新增用户操作
    addUserMessage: function () {
      this.menuData = {
        id: '',
        userId: '',
        userName: '',
        name: '',
        sex: 1,
        age: '',
        address: '',
        student: '',
        status: true
      }
      this.operationType = 1
      this.handleShow()
    },
    // 删除用户操作
    removeUserMessage: function (data) {
      this.$confirm('删除用户，请谨慎操作！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.removeUserList(data)
        })
        .catch(() => {})
    },
    // 编辑用户操作
    updateUserMessage: function (data) {
      this.menuData = data
      this.operationType = 2
      this.handleShow()
    },
    // 新增用户
    addUserList: function (data) {
      const loadingInstance = Loading.service({
        fullscreen: true
      })
      addUser(data)
        .then(res => {
          loadingInstance.close()
          if (res.code === 0) {
            this.$message({
              message: '新增成功',
              type: 'success'
            })

            this.user.pageNum = 1
            this.getUserList()
            this.handleClose()
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
        .catch(res => {
          loadingInstance.close()
          this.$message({
            message: res.msg,
            type: 'error'
          })
        })
    },
    // 删除用户
    removeUserList: function (data) {
      const loadingInstance = Loading.service({
        fullscreen: true
      })
      removeUser({
        id: data.id
      })
        .then(res => {
          loadingInstance.close()
          if (res.code === 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })

            this.user.pageNum = 1
            this.getUserList()
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
        .catch(res => {
          loadingInstance.close()
          this.$message({
            message: res.msg,
            type: 'error'
          })
        })
    },
    // 查询用户列表
    getUserList: function () {
      const loadingInstance = Loading.service({
        fullscreen: true
      })
      getUser({
        pageNum: this.user.pageNum,
        pageSize: this.user.pageSize
      })
        .then(res => {
          loadingInstance.close()
          if (res.code === 0) {
            this.user.list = res.data.data
            this.user.totalSize = res.data.totalSize
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
        .catch(res => {
          loadingInstance.close()
          this.$message({
            message: res.msg,
            type: 'error'
          })
        })
    },
    // 编辑用户
    updateUserList: function (data) {
      const loadingInstance = Loading.service({
        fullscreen: true
      })
      updateUser(data)
        .then(res => {
          loadingInstance.close()
          if (res.code === 0) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })

            this.getUserList()
            this.handleClose()
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
        .catch(res => {
          loadingInstance.close()
          this.$message({
            message: res.msg,
            type: 'error'
          })
        })
    },
    // 获取label状态值
    getStatusLabel: function (data, status) {
      for (let i = 0, len = data; i < len.length; i++) {
        if (len[i].value === status) {
          return len[i].label
        }
      }
    },
    // 每页条数改变回调
    handleSizeChange (val) {
      this.user.pageSize = val
      this.getUserList()
    },
    // 当前页改变回调
    handleCurrentChange (val) {
      this.user.pageNum = val
      this.getUserList()
    },
    // 获取dialog名称
    getDialogTitle: function () {
      let title = ''
      if (this.operationType === 1) {
        title = '新增'
      } else if (this.operationType === 2) {
        title = '编辑'
      } else {
        title = '查看'
      }

      return title + '用户'
    },
    // 关闭弹框
    handleClose: function () {
      this.dialogVisible = false
    },
    // 打开弹框
    handleShow: function () {
      this.dialogVisible = true
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.operationType === 1) {
            this.addUserList(this.menuData)
          } else {
            this.updateUserList(this.menuData)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  font-size: 14px;
  color: #606266;
  height: 100%;
  border: 1px solid #dcdfe6;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
    0 0 6px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  background-color: #ffffff;
  padding: 15px;
}
.mt15 {
  margin-top: 15px;
}
.select_box {
  width: 220px;
}
</style>
