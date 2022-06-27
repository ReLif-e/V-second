<template>
  <div>
    <upload-excel :on-success="handleSuccess" :before-upload="beforeUpload" />

  </div>
</template>

<script>
import { importEmployee } from '@/api/employees'

// import { formatExcelDate } from '@/utils'

export default {

  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    async handleSuccess({ results, header }) {
      // console.log(results)
      // this.tableData = results
      // this.tableHeader = header

      // 定一个变量好在发送请求传递数据,再把  转换前数据  传递到一个转换函数中
      const data = this.treExcel(results)
      // console.log(data)
      try {
        const res = await importEmployee(data)
        // console.log(res)

        //  提示
        this.$message.success(res.message)

        // 返回上一级
        this.$router.back()
      } catch (e) {
        this.$message.error(e.message)
      }
    },

    treExcel(results) {
      const mapInfo = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName',
        '聘用形式': 'formOfEmployment'
      }

      return results.map(zhObj => {
        // 变量定义在遍历中,只会执行一次
        const enObj = {}

        // zhObj是 数据里的每一个对象
        // console.log(zhObj)

        // 每一个对象的值
        const zhKeys = Object.keys(zhObj)
        // console.log(zhKeys)

        // 遍历值如何将值和映射关系一对一对应
        zhKeys.forEach(zhKey => {
          // console.log(zhKey)
          const enKey = mapInfo[zhKey]
          // console.log(enKey)
          if (enKey === 'timeOfEntry' || enKey === 'correctionTime') {
            // enObj[enKey] = new Date(formatExcelDate(zhObj[zhKey]))
          } else {
            enObj[enKey] = zhObj[zhKey]
          }
        })
        return enObj
      })
    }

  }

}
</script>

<style>

</style>
