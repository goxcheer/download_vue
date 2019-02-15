// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '@/assets/css/style.css'
import iView from 'iview'; // 导入组件库
import iEditor from 'iview-editor';
import 'iview/dist/styles/iview.css'
import 'iview-editor/dist/iview-editor.css';
import router from './router'
import store from '@/store/index.js'; //公共状态管理

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(iEditor);

window.gMain = {
  apiPath:'/'
  ,components:{
    iView:iView
  }
}
//所有api的请求前缀，开发模式和生产的代码前缀不一样，开发是跨域请求，生产代码是当前域请求
// //如果当前是webpack的开发模式
if(process.env.NODE_ENV == "development"){
  gMain.apiPath = '/api';
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
