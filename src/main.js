// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入 element-ui
import ElementUI from 'element-ui'
//引入 element-ui 样式
import '../node_modules/element-ui/lib/theme-chalk/index.css'

// 引用 element-tree-grid 插件
import ElTreeGrid from 'element-tree-grid'
// 定义为全局组件
Vue.component(ElTreeGrid.name, ElTreeGrid)

//引入全局样式
import './assets/css/index.css'

//引入 axios 的插件
import myaxios from './assets/js/myaxios.js'

// 引入 moment 
import mymoment from './assets/js/mymoment.js'

// 引入富文本框
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor, /* { default global options } */)

// 引入百度地图
import BMap from 'BMap' 

//调用 use 方法
Vue.use(ElementUI)
Vue.use(myaxios)
Vue.use(mymoment)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
