import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

const _imports=files=>()=>import(`@/views/${files}.vue`)

export const RouterMap=[
  {
    path:'/',
    name: '我的订单',
    meta: { login: true,keepAlive:true},
    component: _imports('Layouts/Index'),
    redirect: '/order',
    children: [
      { path: 'order', component: _imports('Home/Index'), name: '我的订单' ,meta:{login:true,keepAlive:true} },
      //{ path: 'orderList/:id', component: _imports('Home/OrderList'), name: '我的订单' }
    ]
  },
  {
    path: '/orderList/:id',
    name: '我的订单-详情',
    meta: {login: true},
    component: _imports('Home/OrderList')
  },
  {
    path:'/stockCheck',
    name: '库存查询',
    meta: { login: true,keepAlive:true},
    component: _imports('Layouts/Index'),
    redirect: '/',
    children: [
      { path: '/', component: _imports('StcockCheck/Index'), name: '库存查询',meta: { login: true} },
    ]
  }
  ,
  {
    path: '/goodsList',
    name: '商品库存',
    component: _imports('SearchLayout/Index'),
    meta: {login: true,keepAlive:true},
    children: [
      { path: '/', component: _imports('StcockCheck/GoodsList'), name: '商品库存',meta: { login: true} },
    ]
  },
  {
    path: '/login',
    name: '登录',
    component: _imports('Login/Index')
  },
  {
    path: '/jump',
    name: '登录',
    meta: {login: true},
    component: _imports('Jump/Index')
  },
  {
    path:'/remind',
    name: '资质到期提醒',
    meta: { login: true},
    component: _imports('Layouts/Index'),
    redirect: '/',
    children: [
      { path: '/', component: _imports('Remind/Index'), name: '资质到期提醒',meta: { login: true} },
    ]
  },
  {
    path: '/remind/productRemind',
    name: '产品类资质证照提醒',
    meta: {login: true},
    component: _imports('Remind/ProductList')
  },
  {
    path: '/remind/permitList',
    name: '商业企业资质证照提醒',
    meta: {login: true},
    component: _imports('Remind/PermitList')
  }
];
export const router=new Router({
  routes:RouterMap
});
