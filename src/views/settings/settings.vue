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
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="List">
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <!-- <template slot-scope="scope"> -->
                <template>
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
                  <el-button size="small" type="danger">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                :current-page.sync="q.page"
                :page-sizes="[2, 3, 4, 5]"
                :page-size="q.pagesize"
                layout="sizes, prev, pager, next"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>

  </div>
</template>
<script>
import { GetEmploy } from '@/api/employees'
export default {
  data() {
    return {
      List: [], // 渲染的数据
      q: { // 带过去要渲染多少数据的参数
        page: 1,
        pagesize: 2
      },
      total: ''
    }
  },
  created() {
    this.EmployeesList()
  },
  methods: {
    async  EmployeesList() {
      const res = await GetEmploy(this.q)
      console.log(res)
      this.List = res.data.rows // 保存的是返回数据里面的数据
      this.total = res.data.total
    },
    // 切换分页点击后改变q里面的数据，并重新渲染
    handleSizeChange(page) {
      this.q.page = page
      this.EmployeesList()
    },
    handleCurrentChange(pagesize) {
      this.q.pagesize = pagesize
      this.EmployeesList()
    }
  }
}
</script>
