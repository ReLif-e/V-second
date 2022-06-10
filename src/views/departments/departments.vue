<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button type="primary" size="small" @click="hAdd(1,'0')">添加权限</el-button>
        </div>
        <el-table border :data="list" row-key="id" default-expand-all>
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="code" label="标识" />
          <el-table-column prop="description" label="描述" />
          <el-table-column label="操作">
            <template v-slot="{row}">
              <el-button v-if="row.type === 1" type="text" @click="hAdd(2,row.id)">添加</el-button>
              <!-- <el-button type="text" @click="hAdd(row.id)">编辑</el-button> -->
              <el-button type="text" @click="hIsedit(row)">编辑</el-button>
              <el-button type="text" @click="Del(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <el-dialog
      :visible.sync="showDialog"
      :title="isEdit ? '编辑' :'增加'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="closed"
    >
      <!-- 表单内容 -->
      <el-form ref="FormDate" label-width="100px" :rules="rules" :model="formData">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" />
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input v-model="formData.description" />
        </el-form-item>
        <el-form-item label="权限启用">
          <el-switch
            v-model="formData.enVisible"
            active-text="启用"
            active-value="1"
            inactive-text="不启用"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div style="text-align: right;">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="hSubmit">确定</el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>
<script>

import { addPermission, delPermission, getPermissionList, updatePermission } from '@/api/permisson'
import { tranListToTreeData } from '@/utils'
export default {
  data() {
    return {
      isEdit: false,
      list: [],
      showDialog: false, // 是否显示弹层
      formData: {
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        enVisible: '0', // 开启
        pid: '', // 添加到哪个节点下
        type: '' // 类型
      },
      rules: {
        name: [
          { required: true, message: '请写入权限名称', tirgger: 'blur' }
        ],
        code: [
          { required: true, message: '请写入权限名称', tirgger: 'blur' }
        ],
        description: [
          { required: true, message: '请写入权限名称', tirgger: 'blur' }
        ]

      }
    }
  },
  created() {
    this.GetUser()
  },
  methods: {
    async GetUser() {
      const res = await getPermissionList(this.formData)
      // console.log(res)
      this.list = tranListToTreeData(res.data)
    },

    // 点击的谁就添加到哪个的子部门
    async hAdd(type, pid) {
      // 状态改变
      this.isEdit = false

      // 弹框显示
      this.showDialog = true
      // console.log(id, pids)

      // 让把点击的是页面权限还是按钮权限点击的是哪一个传递过去
      this.formData.type = type
      this.formData.pid = pid
    },

    // 兜底
    async hSubmit() {
      const valid = await this.$refs.FormDate.validate().catch(e => e)
      if (!valid) return
      let res = null
      try {
        if (this.isEdit) {
          res = await updatePermission(this.formData)
        } else {
          // 增加请求
          res = await addPermission(this.formData)
        }
        console.log(res)

        // 关闭弹框
        this.showDialog = false

        // 重新渲染
        this.GetUser()

        // 提示
        this.$message.success(res.message)
      } catch (e) {
        this.$message.error(e.message)
      }
    },

    // 编辑
    hIsedit(item) {
      this.isEdit = true
      this.showDialog = true

      this.formData = { ...item }
    },

    // 关闭弹框事件
    closed() {
      this.formData = {
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        enVisible: '0', // 开启
        pid: '', // 添加到哪个节点下
        type: '' // 类型
      }

      this.$refs.FormDate.resetFields()
    },
    // 删除
    async Del(id) {
      await this.$confirm('确定删除?', '提示', { type: 'warning' }).catch(e => e)
      try {
        const res = await delPermission(id)
        this.GetUser()
        this.$Mmessage.success(res.message)
      } catch (e) {
        this.$Mmessage.error(e.message)
      }
    }
  }
}
</script>
