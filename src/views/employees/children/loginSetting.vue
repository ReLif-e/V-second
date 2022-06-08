<template>
  <el-form
    ref="userForm"
    :model="userInfo"
    label-width="120px"
    style="margin-left: 120px; margin-top: 30px"
    :rules="rules"
  >
    <el-form-item label="姓名:" prop="username">
      <el-input v-model="userInfo.username" style="width:300px" />
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input v-model="userInfo.password" type="password" style="width:300px" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="hAdd">更新</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getuserDetailById, PutguserDetailById } from '@/api/employees'
export default {
  data() {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '姓名不能为空', tirgger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', tirgger: 'blur' }
        ]
      }

    }
  },
  created() {
    this.GetByid()
  },
  methods: {
    async GetByid() {
      const res = await getuserDetailById(this.$route.params.id)
      // console.log(res)
      this.userInfo = res.data
    },
    // 保存信息
    async hAdd() {
      try {
        const res = await PutguserDetailById(this.userInfo)
        // console.log(res)

        // 提醒
        this.$message.success(res.message)
      } catch (e) {
        this.$message.error(e.message)
      }
    }
  }
}
</script>

