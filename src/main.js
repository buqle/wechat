// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/LoginRouter'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import './css/public.css'
Vue.use(Mint);

Vue.config.productionTip = false
//icon
import './utils/iconfont'
//vuex
import Vstore from './store/index'

//跳转
Vue.prototype.skip = (route, id) => {
  route.push('/orderList/'+id)
}
//过滤字符长度
Vue.filter('readMore', function (text, length, suffix) {
  return text.substring(0, length) + suffix
})
//token失效跳转登录
Vue.prototype.out = () => {
  window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe28adc88ef924d87&redirect_uri=http%3a%2f%2f60.174.197.140%3a9001%2fdist%2f%23%2flogin&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
}
//axios
import axios from 'axios';//cnpm install axios qs -S
Vue.prototype.$http = axios;

import api from './api' // 导入api接口
Vue.prototype.$api = api; // 将api挂载到vue的原型上
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store:Vstore,
  render:h=>h(App)
})
