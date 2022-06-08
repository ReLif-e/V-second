<template>
  <div class="user-info">
    <!-- 个人信息 -->
    <el-form label-width="220px" :model="userInfo" :rules="rules">
      <!--手机 -->

      <el-form-item label="手机" prop="mobile">
        <el-input v-model="userInfo.mobile" style="width:220px" />
      </el-form-item>

      <!-- 工号 入职时间 -->

      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="userInfo.timeOfEntry"
          type="date"
          class="inputW"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>

      <!-- 员工照片 -->

      <el-form-item label="员工头像">
        <!-- 放置上传图片 -->
        <UploadImg v-model="userInfo.staffPhoto" @input="e => userInfo.staffPhoto = e " />
      </el-form-item>

      <!-- 保存个人信息 -->
      <el-form-item>
        <el-button type="primary" @click="hAdd">保存更新</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getuserDetailById, PutguserDetailById } from '@/api/employees'
export default {
  data() {
    return {
      userId: this.$route.query.id,
      userInfo: {
        mobile: '',
        timeOfEntry: '',
        staffPhoto: ''
      },
      rules: {
        mobile: [
          { required: true, message: '姓名不能为空', tirgger: 'change' }
        ],
        timeOfEntry: [
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
      console.log(res)
      this.userInfo = res.data
      this.staffPhoto = res.data
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

<style scoped lang="scss">
  .user-info{
    padding-top:20px;
  }
</style>
