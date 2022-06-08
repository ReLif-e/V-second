<template>
  <div>
    <!--
      show-file-list: 是否显示上传的文件列表

      action: '#' 用来指定文件要上传的地址，由于我们需要定制上传动作这里设为#

      :http-request：自定义上传行为（重点）

      on-success: 上传成功之后的回调
      before-upload： 上传之前的检查
    -->
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="upload"
    >
      <el-progress v-if="percent && percent < 100 " type="circle" :percentage="percent" />
      <img v-if="value" :src="value" class="avatar">
      <i v-show="value" v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>
<script>
// 下面的代码是固定写法
const COS = require('cos-js-sdk-v5')
// 填写自己腾讯云cos中的key和id (密钥)
const cos = new COS({
  SecretId: 'AKIDuc4FAoCJNHuHNClAPP8iTxA5k7D2bt1t', // 身份识别ID
  SecretKey: 'gphNmvmMfhRv97dsqY0B6k7D2bA5oOku' // 身份秘钥
})
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // imageUrl: '',
      percent: 0
    }
  },
  methods: {

    upload(res) {
      if (res.file) {
        // console.log(res.file)
        // 执行上传操作
        cos.putObject({
          Bucket: 'web-75-1312367913', /* 存储桶 */
          Region: 'ap-nanjing', /* 存储桶所在地域，必须字段 */
          Key: res.file.name, /* 文件名 */
          StorageClass: 'STANDARD', // 上传模式, 标准模式
          Body: res.file, // 上传文件对象
          onProgress: (progressData) => {
            // console.log(progressData)
            this.percent = Math.ceil(progressData.percent * 100)
          }
        }, (err, data) => {
          console.log(err || data)
          // 上传成功之后
          if (data.statusCode === 200) {
            // this.imageUrl = `https:${data.Location}`
            // this.$emit('input', this.imageUrl)
            this.$emit('input', `https:${data.Location}`) // v-modle的默认事件就是input所以这里可以用input事件
          }
        })
      }
    },

    beforeAvatarUpload(file) {
      const isPNG = file.type.startsWith('image/')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isPNG) {
        this.$message.error('上传头像只能是图片格式文件!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isPNG && isLt2M
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-progress-circle{
    width: 178px !important;
    height: 178px !important;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-progress-circle{
    width: 178px !important;
    height: 178px !important;
}
</style>
