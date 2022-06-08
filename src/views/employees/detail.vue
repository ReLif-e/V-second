<template>
  <div class="employees-container">
    <div class="app-container">
      {{ $route.params.id }}
      <!-- 路由传参👆 -->

      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <login-setting />
          </el-tab-pane>

          <el-tab-pane label="个人详情">
            <user-info />
          </el-tab-pane>

          <el-tab-pane label="岗位信息">
            <job-info />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import UserInfo from './children/userInfo.vue'
import LoginSetting from './children/loginSetting.vue'
import JobInfo from './children/jobInfo.vue'
export default {
  components: {
    UserInfo,
    LoginSetting,
    JobInfo
  },
  data() {
    return {

    }
  }
}
</script>
