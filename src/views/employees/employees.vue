<template>
  <div class="department-container">
    <div class="app-container">

      <!-- 左侧 -->
      <page-tools>
        <template #left>
          <i class="el-icon-info" />
          <span>总记录{{ total }}</span>
        </template>

        <!-- 右侧 -->
        <template #right>
          <el-button v-allow="'Del_Exlcel'" type="primary" @click="drive">导出Excel</el-button>
          <el-button v-allow="'export_Exlcel'" type="success" @click="$router.push('/employees/import')">导入Excel</el-button>
          <el-button v-allow="'export_add'" type="danger" @click="AddPeople">新增员工</el-button>
        </template>
      </page-tools>

      <el-card style="margin-top: 10px;">
        <el-table :data="list">
          <el-table-column label="序号" type="index" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="头像">
            <template v-slot="{row}">
              <img class="num" :src="row.staffPhoto" alt="">
            </template>
          </el-table-column>
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment">
            <template v-slot="{row}">
              {{ forItem(row.formOfEmployment) }}
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry">
            <template v-slot="{row}">
              {{ formData(row.timeOfEntry) }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{row}">
              <el-button type="text" size="small" @click="$router.push('./employees/detail/' + row.id)">查看</el-button>
              <el-button type="text" size="small" @click="hroute(row.id)">分配角色</el-button>
              <el-button type="text" size="small" @click="Sub(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            :current-page.sync="q.page"
            :page-sizes="[2, 3, 4, 5]"
            :page-size="q.size"
            layout="sizes, prev, pager, next"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>
      <el-dialog
        title="添加角色"
        :visible.sync="ShowDialog"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
      >
        <employess-dialog
          @input="Success"
        />
      </el-dialog>
    </div>
    <el-dialog
      v-if="dialogVisible"
      title="分配角色"
      :visible.sync="dialogVisible"
    >
      <AssignRole
        :id="curyId"
        ref="fromId"
        @success="dialogVisible=false"
        @closeD="Close"
      />
    </el-dialog>
  </div>
</template>

<script>
// 转换数据
import employees from '@/constant/employees'

import dayjs from 'dayjs'
import { GetEmploy, Getuser, Subuser } from '@/api/employees'
import AssignRole from './assignRole.vue'
// 213123
// 导入点击显示的弹框1111111

import EmployessDialog from './EmployeesDialog.vue'

const hireType = {}
employees.hireType.forEach(item => {
  hireType[item.id] = item.value
})
export default {
  components: {
    EmployessDialog,
    AssignRole
  },
  data() {
    return {
      curyId: '',
      dialogVisible: false,
      list: [],
      q: {
        page: 1,
        size: 2
      },
      total: null,
      ShowDialog: false
    }
  },
  created() {
    this.GetList() // 渲染页面
  },
  methods: {
    forItem(code) {
      // console.log(code)
      return hireType[code]
    },
    Close() {
      this.$refs.fromId.Close.close()
    },
    Success() {
      // console.log(1)
      // 关闭弹框
      this.ShowDialog = false

      this.total++
      // 页数等于=总条数除以显示数据的条数
      this.q.page = Math.ceil(this.total / this.q.size)

      // 重新渲染
      this.GetList()
    },
    // 发送请求获取渲染数据
    async GetList() {
      const res = await Getuser(this.q)
      // console.log(res)
      // 获取的数据存入空数组,方便渲染
      this.list = res.data.rows

      // 让总条数等于创建出来的
      this.total = res.data.total
    },

    // 分页的事件-----------------------------------------
    handleSizeChange(size) {
      // 切换分页改变传递的数据
      this.q.size = size

      // 重新渲染
      this.GetList()
    },
    handleCurrentChange(page) {
      this.q.page = page

      // 重新渲染
      this.GetList()
    },

    // 格式化时间
    formData(time) {
      return dayjs(time).format('YYYY-MM-DD')
    },

    // 删除员工按钮
    async Sub(id) {
      try {
        // 点击删除提示用户
        await this.$confirm('确定删除吗？', '提示')

        // 用户点击确定发送请求
        const res = await Subuser(id)

        // 根据结果提示用户
        this.$message.success(res.message)

        // 如果删除后渲染在页面上的数据只有一条并且当前页面大于一
        // 那么在删除最后一条时会当前显示页会往前减一
        if (this.list.length === 1 && this.q.page > 1) {
          this.q.page--
        }

        // 重新渲染
        this.GetList()
      } catch (e) {
        // console.log(e)
        if (e === 'cancel') return
        this.$message.error(e.message)
      }
    },

    // 添加角色
    AddPeople() {
      this.ShowDialog = true
    },

    // 分配权限
    async hroute(id) {
      this.dialogVisible = true

      this.curyId = id
    },

    // 导出
    async drive() {
      // 表单头--转换数据
      const map = {
        'id': '编号',
        'password': '密码',
        'mobile': '手机号',
        'username': '姓名',
        'timeOfEntry': '入职日期',
        'formOfEmployment': '聘用形式',
        'correctionTime': '转正日期',
        'workNumber': '工号',
        'departmentName': '部门',
        'staffPhoto': '头像地址'
      }
      const { data: res } = await GetEmploy({ page: 1, size: this.total })
      // console.log(res.rows)
      const list = res.rows
      console.log(list)

      // 导出类似方法

      // // 遍历数据替换数据
      // const zhList = list.map(zhObj => {
      //   // console.log(item)
      //   // 创建一个空的来装数据
      //   const enObj = {}

      //   // 取出每个对象中的键 const zhObj =
      //   const enkey = Object.keys(zhObj)
      //   // console.log(enkey)

      //   // 遍历循环映射关系将取出的键一一对应
      //   enkey.forEach(enKeys => {
      //     const zhKey = map[enKeys]
      //     // console.log(zhKey)
      //     // console.log(enKeys)

      //     // 换数据
      //     enObj[zhKey] = zhObj[enKeys]
      //   })
      //   return enObj
      // })
      // console.log(zhList)

      // 获取第一条数据的内容
      const first = list[0]
      // console.log(first)

      // 如果没有获取到第一条数据就返回
      if (!first) return

      // 通过第一条数据的键去映射关系里面找对应的
      const header = Object.keys(first).map(item => map[item])
      // console.log(header)

      const data = list.map(item => {
        // console.log(item)
        // 返回的数据是1、2  通过循环去变成正式和非正式
        const code = item['formOfEmployment']
        item['formOfEmployment'] = hireType[code]

        // 转换时间
        const time = item['timeOfEntry']
        item['timeOfEntry'] = this.formData(time)

        const times = item['correctionTime']
        item['correctionTime'] = this.formData(times)

        // 返回中文的值作为数据
        return Object.values(item)
      })
      // 导出功能
      import('@/vendor/Export2Excel').then(excel => {
        // excel表示导入的模块对象
        console.log(excel)
        excel.export_json_to_excel({
          header, // 表头 必填
          data, // 具体数据 必填
          filename: 'excel-list', // 文件名称
          autoWidth: true, // 宽度是否自适应
          bookType: 'xlsx' // 生成的文件类型
        })
      })
    }
  }
}
</script>

<style >
 /* 头像样式 */
  .num{
      width: 50px;
     height: 50px;
     border-radius:50% ;
  }
</style>
