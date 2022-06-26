import PageTools from '@/components/PageTools'
import UploadImg from '@/components/UploadImg'
import UploadExcel from '@/components/UploadExcel'

// 注册全局组件
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadImg', UploadImg)
    Vue.component('UploadExcel', UploadExcel)
  }
}
