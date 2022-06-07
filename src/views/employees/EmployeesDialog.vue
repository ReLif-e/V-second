<template>
  <!-- 表单 -->
  <el-form ref="FormData" label-width="120px" :rules="rules" :model="formData">
    <el-form-item label="姓名" prop="username">
      <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="入职时间" prop="timeOfEntry">
      <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
    </el-form-item>
    <el-form-item label="聘用形式" prop="formOfEmployment">
      <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
        <el-option v-for="item in hireType" :key="item.id" :value="item.id" :label="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="工号" prop="workNumber">
      <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
    </el-form-item>
    <el-form-item label="部门" prop="departmentName">
      <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="loadDeparment()" />
      <!-- //下拉--  props="{label:'name'}改变名称，因为饿了么组件要的是lable，而数据是name-->
      <el-tree v-if="List.length" expand-on-click-node default-expand-all :data="List" :props="{label:'name'}" @node-click="handleNodeClick" />

    </el-form-item>
    <el-form-item label="转正时间">
      <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
    </el-form-item>
    <el-form-item>
      <el-button>取消</el-button>
      <el-button type="primary" @click="hSubmit">确定</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { Postuser } from '@/api/employees'

import Employess from '@/constant/employees'
import { GetPartment } from '@/api/department'
import { tranListToTreeData } from '@/utils'
export default {
  data() {
    return {
      hireType: Employess.hireType,
      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          // { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ]
      },
      List: [] // 渲染点击部门后的数据

    }
  },
  methods: {
    // 添加角色的确定按钮
    async hSubmit() {
      try {
        const res = await Postuser(this.formData)
        // 根据结果提醒用户
        this.$message.success(res.message)
        console.log(res)

        this.$emit('input')
      } catch (e) {
        // 如果结果错误提醒用户
        this.$message.error(e.message)
      }
    },
    // 获取所有部门信息
    async loadDeparment() {
      const res = await GetPartment()
      console.log(res)
      res.data.depts.shift()
      // 转换成树形结构，让子组件出现
      this.List = tranListToTreeData(res.data.depts)
    },
    handleNodeClick(data) {
      console.log(data) // 所属部门的信息，以及子部门
      if (data.children.length !== 0) return
      // 让点击的部门信息填入表单里面
      this.formData.departmentName = data.name

      this.List = []
    }
  }
}
</script>
