import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions'
import mutations from './mutations';
import {Cookie} from "@/utils/storage";

Vue.use(Vuex);
const state={
  //token:'ea3858d9a86a4d0eb0ffed2482f34dbd',
  token:Cookie.get('token'),
  loginName:Cookie.get('loginName'),
  //loginName:'admin',
  loading:false,
  loadingClass:false,
  loadingText:'登录中...',
  wxSate:{
    username:'',
    password:''
  },
  loginCode:'',
  footerList:[
    {tit:'我的订单',icon:'icon-aiguifanfile',path:'/order'},
    {tit:'提醒',icon:'icon-ziliaodaoqitixing',path:'/remind'},
    {tit:'库存查询',icon:'icon-kucunchaxun',path:'/stockCheck'},
    //{tit:'退出',icon:'icon-tuichu4',path:'#'},
  ],
  //drugList
  drugList:[],
  loadMore:{
    loadingImg: true,
    loading: true,
    loadingDom:false,
    totalNum: 0,
    pageSize: 10,
    pageNo: 1,
    list:[],
    info:{}
  },
 //搜索
  searchObj:{
    searchShow:false,//是否显示搜索结果下拉
    searchWords:''//code
  },
  //历史记录arr
  store_detail_list:[],//当前在库商品
  jxp_list:[],//近效期商品种类
  low_store_list:[],//低库存商品库存
  delay_store_list:[],//待滞商品库存
  //部门arr
  deptObj:{
    deptCode:'',//部门code
    deptShow:false,//部门下拉显示
    supplierShow:false,
    supplierCode:''
  }
};
export default new Vuex.Store({
  state,actions,mutations
})
