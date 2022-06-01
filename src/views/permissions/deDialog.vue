<template>
  <el-form ref="deptForm" label-width="120px">
    <el-form-item label="部门名称">
      <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门编码">
      <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门负责人">
      <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
        <el-option v-for="item in List" :key="item.id" :value="item.username" :label="item.username" />
      </el-select>
    </el-form-item>
    <el-form-item label="部门介绍">
      <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click="hSubmit">确定</el-button>
      <el-button size="small" @click="hCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { GetEmployees } from '@/api/employees'
import { GetByid, PostPartment, PutPartment } from '@/api/department'
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    isedit: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      List: []
    }
  },
  created() {
    this.GetEmployees()
    this.Byid()
  },
  methods: {
    // 判断点开的是什么页面
    async Byid() {
      if (!this.isedit) return
      const res = await GetByid(this.id)
      this.form = res.data
    },
    async GetEmployees() {
      const res = await GetEmployees()
      this.List = res.data
      // console.log(this.List)
    },
    async hSubmit() {
      try {
        let res = null
        if (!this.isedit) {
          // 通过传递过来的id来实现在当前部门添加子集部门,给form添加一个id的属性,因为接口要求五个少一个id,加上
          // this.form.pid = this.id
          res = await PostPartment({ ...this.form, pid: this.id })
        } else {
          res = await PutPartment(this.form)
        }
        // console.log('添加', res) // 添加的部门成功与否
        this.$emit('success')
        this.$message.success(res.message)
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    hCancel() {

    }
  }
}
// async  hEdit() {
//   try {
//     // 通过传递过来的id来实现在当前部门添加子集部门,给form添加一个id的属性,因为接口要求五个少一个id,加上
//     this.form.pid = this.id
//     const res = await PostPartment(this.form)
//     console.log('添加', res) // 添加的部门成功与否
//     this.$emit('success')
//     this.$message.success(res.message)
//   } catch (e) {
//     this.$message.error(e.message)
//   }
// },
// async cEdit() {
//   try {
//     // 通过传递过来的id来实现在当前部门添加子集部门,给form添加一个id的属性,因为接口要求五个少一个id,加上
//     const res = await PutPartment(this.form)
//     console.log(res)
//     this.$emit('success')
//     this.$message.success(res.message)
//   } catch (e) {
//     this.$message.error(e.message)
//   }
// },

</script>

<style>

</style>
