<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="AddPepple"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="List">
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <!-- <template slot-scope="scope"> -->
                <template v-slot="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="Edit(row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="remove(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                :current-page.sync="q.page"
                :page-sizes="[2, 3, 5, 10]"
                :page-size="q.pagesize"
                :total="total"
                layout="sizes, prev, pager, next"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 新增弹框 -->
    <el-dialog
      :title="isEdit ? '编辑' :'新增'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="showDialog"
    >
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small">取消</el-button>
          <el-button size="small" type="primary" @click="hSubmit">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { AddEmploy, DelEmploy, GetEmploy, PutEmploy } from '@/api/employees'
export default {
  data() {
    return {
      isEdit: false,
      List: [], // 渲染的数据
      q: { // 带过去要渲染多少数据的参数
        page: 1,
        pagesize: 2
      },

      total: 0,
      showDialog: false,
      roleForm: { // 用户输入的数据，增加时一起带过去
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    // 渲染页面的函数
    this.EmployeesList()
  },
  methods: {
    async  EmployeesList() {
      const res = await GetEmploy(this.q)
      // console.log(res)
      this.List = res.data.rows // 保存的是返回数据里面的数据
      this.total = res.data.total
    },
    // 切换分页点击后改变q里面的数据，并重新渲染
    handleSizeChange(pagesize) {
      this.q.pagesize = pagesize
      this.EmployeesList()
    },
    handleCurrentChange(page) {
      this.q.page = page
      this.EmployeesList()
    },
    // 删除按钮
    remove(id) {
      // console.log(id)
      this.$confirm('确定删除吗？', '提示', { type: 'warning' })
        .then(async() => {
          // 发送删除请求
          const res = await DelEmploy(id)
          // 根据结果提醒用户
          this.$message.success(res.message)
          // 判断如果这些--渲染的数据--只有一条--并且--当前页面数量大于一时--,删除最后一条数据时会让--总条数减一
          if (this.q.page > 1 && this.List.length === 1) {
            this.total--
          }
          // 重新渲染页面
          this.EmployeesList()
        })
        .catch((e) => {
          console.log(e)
          if (e === 'cancel') return

          this.$message.error(e.message)
        })
    },
    // 点击新增角色按钮
    AddPepple() {
      // 弹框出现
      this.showDialog = true

      // 改变状态
      this.isEdit = false
    },

    // 弹框内部点击到了确定按钮
    async hSubmit() {
      // 兜底校验
      const valid = this.$refs.roleForm.validate((e) => e)
      if (!valid) return

      // 发送增加角色的请求
      const res = await AddEmploy(this.roleForm)
      console.log(res)

      // 关闭弹窗
      this.showDialog = false

      // 根据结果提醒用户
      this.$message.success(res.message)

      // 添加角色后，让当前显示的页面跳转到最后一页
      // if (this.total % this.q.pagesize === 0) {
      //   this.total++
      // }
      this.q.page = Math.ceil(this.total / this.q.pagesize)
      // 重新渲染
      this.EmployeesList()
    },

    // 编辑的确定按钮
    async Edit(row) {
      console.log(row)
      // 让弹框显示
      this.showDialog = true

      // 数据回填
      this.roleForm = row

      // 改变状态
      this.isEdit = true

      const res = await PutEmploy(this.roleForm)
      console.log(res)
      console.log(res)
    }
  }
}
</script>
