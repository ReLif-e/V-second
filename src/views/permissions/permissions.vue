<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 用一个行列布局 -->
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <el-col :span="20">
            <svg-icon icon-class="home" /><span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>负责人</el-col>
              <!-- 下拉菜单 element -->
              <el-col>
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-tree :data="list" default-expand-all>
          <template v-slot="scope">
            <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width:100%">
              <el-col :span="20">
                <span>{{ scope.data.name }}</span>
              </el-col>
              <el-col :span="4">
                <el-row type="flex" justify="end">
                  <!-- 两个内容 -->
                  <el-col>{{ scope.data.manager }}</el-col>
                  <!-- 下拉菜单 element -->
                  <el-col>
                    <el-dropdown>
                      <span>
                        操作<i class="el-icon-arrow-down" />
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <!-- 当添加了事件时,没生效可以试着添加一个native -->
                        <el-dropdown-item @click.native="hAdd(scope.data.id)">添加子部门</el-dropdown-item>
                        <el-dropdown-item @click.native="hchange(scope.data.id)">编辑</el-dropdown-item>
                        <el-dropdown-item @click.native="hDel(scope.data.id)">删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 弹框 -->
    <!-- 添加 -->
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      width="80%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <!-- 自定义事件是@开头 -->
      <de-Dialog v-if="dialogVisible" :id="id" :isedit="isEdit" @success="success" />
    </el-dialog>

    <!-- 编辑部门 -->
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisibleChange"
      width="80%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <!-- 自定义事件是@开头 -->
      <de-Dialog v-if="dialogVisibleChange" :id="id" :isedit="isEdit" @success="success" />
    </el-dialog>
  </div>
</template>
<script>
import { DelPartment, GetPartment } from '@/api/department' // 按需导入
// 导入把数据变成树状图的第三方代码
import { tranListToTreeData } from '@/utils/index' // 按需导入
import deDialog from './deDialog.vue'
export default {
  components: {
    deDialog
  },
  data() {
    return {
      // 依赖一份树形数据
      list: [],
      id: '',
      dialogVisible: false,
      dialogVisibleChange: false,
      isEdit: false
    }
  },
  created() {
    this.GetParment() // 渲染部们列表信息
  },
  methods: {

    // 发送请求获取部门列表
    async GetParment() {
      try {
        const res = await GetPartment()
        res.data.depts.shift()
        this.list = tranListToTreeData(res.data.depts)
        // console.log(this.list) // 打印获取的部门信息
      } catch (err) {
        console.dir(err)
      }
    },
    // 添加部门点击让弹框出现的
    hAdd(id) { // 获取被点击的部门id
      this.dialogVisible = true
      this.id = id
      // console.log(this.id)
      this.isEdit = false
    },
    // 编辑部门
    hchange(id) {
      this.dialogVisibleChange = true
      this.isEdit = true
      this.id = id
    },
    hDel(id) {
      this.$confirm('确定删除吗?', '提示', { type: 'warning' })
        .then(async() => {
          const res = await DelPartment(id)
          // console.log(res)
          this.GetParment()
          this.$message.success(res.message)
        })
        .catch((e) => {
          this.$message.error(e.message)
        })
    },
    // 自定义事件子组件内添加部门完成后关闭弹框并重新渲染
    success() {
      this.GetParment()
      this.dialogVisible = false
      this.dialogVisibleChange = false
    }
  }
}
</script>
