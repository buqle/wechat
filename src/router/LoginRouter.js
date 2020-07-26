import {router} from "./index";
import store from '@/store'
import {Cookie} from "@/Utils/storage";
import Vue from 'vue';
router.beforeEach((to,from,next)=>{
  if(to.meta.login){//判断前往的页面是否要登录
    if(store.state.loginName){
      next()
    }else {
      /* next({
        path: '/login',
        //query: { redirect: to.fullPath }//把要跳转的地址作为参数传到下一步
      })*/
      //跳转至登录授权页面 正式服务器
     /* window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe28adc88ef924d87&redirect_uri=http%3a%2f%2f60.174.197.140%3a9001%2fdist%2f%23%2flogin&response_type=code&scope=snsapi_base&state=123#wechat_redirect`*/
      Vue.prototype.out()
    }
  }else {next()}

});

router.afterEach((to,from)=>{
  document.title=to.name;

});

export  default router;
