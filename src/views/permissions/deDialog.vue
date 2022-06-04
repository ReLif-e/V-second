<template>
  <el-form ref="deptForm" label-width="120px" :rules="rules" :model="form">
    <el-form-item label="部门名称" prop="name">
      <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门编码" prop="code">
      <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门负责人" prop="manager">
      <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
        <el-option v-for="item in List" :key="item.id" :value="item.username" :label="item.username" />
      </el-select>
    </el-form-item>
    <el-form-item label="部门介绍" prop="introduce">
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
    },
    orginList: {
      type: Array,
      required: true
    }
  },
  data() {
    // 找到点击的部门编码
    const validateCode = (rule, value, callback) => {
      console.log(value)
      // 寻找数组里面的code对比有没有一样的
      const Orgin = this.orginList.map(({ code }) => code)
      // // console.log(Orgin)
      // if (Orgin.includes(value)) {
      //   callback(new Error(value + '已存在'))
      // } else {
      //   callback()
      // }
      Orgin.includes(value) ? callback(new Error(value + '已存在')) : callback()
    }

    // 部门名称同级别不能出现多次
    const validateName = (rule, value, callback) => {
      // console.log(value)
      let namelist = null
      if (this.isedit) {
        // 如果点击的是编辑
        // 从传递来过来的数据id里面查找点击的id是否一样，
        // 一样就说明有子菜单，没有就没有子菜单
        const pid = this.orginList.find(item => item.id === this.id).pid
        console.log(pid)
        // 这个数据查找条件 == 传递来的pid等于上面的pid并且传递的 id不等于点击的(排除自己)  的剩下数据里面查找出name
        namelist = this.orginList.filter(item => item.pid === pid && item.id !== this.id).map(({ name }) => name)
      } else {
        namelist = this.orginList.filter(item => item.pid === this.id)
      }
      namelist.includes(value) ? callback(new Error(value + '已存在')) : callback()
    }
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      List: [],
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', tirgger: 'blur' },
          { min: 2, max: 10, message: '名称长度应为2~10位', tirgger: 'blur' },
          { validator: validateName, trigger: 'blur' }

        ],
        code: [
          { required: true, message: '部门编码不能为空', tirgger: 'blur' },
          { min: 2, max: 10, message: '名称长度应为2~10位', tirgger: 'blur' },
          { validator: validateCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '请选择负责人', tirgger: 'change' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', tirgger: 'blur' },
          { min: 2, max: 10, message: '名称长度应为2~10位', tirgger: 'blur' }
        ]
      }
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
      console.log(this.orginList)
      this.$refs.deptForm.validate(async valid => {
        if (!valid) return
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
      })
    },
    hCancel() { // 因为弹框的显示与否是使用if执行，是一个创造和销毁的过程，期间验证和其内容都会跟着销毁
      this.$emit('success')
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
