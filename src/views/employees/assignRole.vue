<template>
  <!-- // 分配角色 -->
  <div>
    <el-checkbox-group v-model="roleIds">
      <!-- 注意：label决定当前选中的值1 -->
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>

    <div style="margin-top: 20px; text-align: right">
      <el-button type="primary" @click="hSubmit">确定</el-button>
      <el-button @click="closeDialog">取12消</el-button>
    </div>
  </div>
</template>
<script>
import { GetemployeesId, updateRoles } from '@/api/roles'

import { heard } from '@/api/user'
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      roleIds: [],
      list: []
    }
  },
  created() {
    this.closeDialog()
    this.closeUser()
  },
  methods: {
    // 获取角色列表
    async closeDialog() {
      const res = await GetemployeesId()
      // console.log(res)

      this.list = res.data.rows
    },

    // 角色列表数据回填
    async closeUser() {
      const res = await heard(this.id)
      // console.log(res)

      this.roleIds = res.data.roleIds
    },

    // 更新角色
    async hSubmit() {
      try {
        const res = await updateRoles({
          id: this.id,
          roleIds: this.roleIds
        })
        this.$emit('success')
        this.$message.success(res.message)
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    close() {
      this.roleIds = []
      console.log(1)
    }
  }
}
</script>
