<template>
  <div>
    <el-tree
      ref="tree"
      :data="data"
      show-checkbox
      node-key="id"
      :props="{label:'name'}"
      default-expand-all
      check-strictly
    />
    <div class="naval">

      <el-button type="error" @click="$emit('close')">取消</el-button>
      <el-button type="success" @click="hSubmit">确定</el-button>
    </div>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permisson'
import { tranListToTreeData } from '@/utils'
import { GetRoleDetail, PutRoleDetail } from '@/api/roles'
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      data: []
    }
  },
  created() {
    this.Getusername()
    this.GetAssign()
  },
  methods: {
    // 获取角色信息
    async Getusername() {
      // console.log(1)
      const res = await getPermissionList()
      // console.log(res)
      this.data = tranListToTreeData(res.data)
    },

    // 获取角色权限信息
    async GetAssign() {
      const res = await GetRoleDetail(this.id)
      console.log(res)
      this.$refs.tree.setCheckedKeys(res.data.permIds)
    },

    // 点击确定
    async hSubmit() {
      try {
      // 获取选中的信息
        const ids = this.$refs.tree.getCheckedKeys()

        // 发送更新请求
        const res = await PutRoleDetail({ id: this.id, permIds: ids })
        console.log(res)
        this.$emit('close')
        this.$message.success(res.message)
      } catch (e) {
        this.$message.error(e.message)
      }
    }
  }
}
</script>

<style>
.naval{
  display: flex;
  justify-content: end;
}
</style>
