import axios from 'axios';
import qs from 'qs';
import store from '@/store';
axios.defaults.withCredentials=true;//设置发送请求时带上cookie
//instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//发送
/*axios.interceptors.request.use(config=>{
  return config
},err=>{
  return Promise.reject(err) //承诺被拒绝
});*/

//响应
//axios.interceptors.response.use(respone=>respone,err=>Promise.resolve(err.response))//承诺被接受

//检查状态码
function checkStatus(res) {
  if(res.status==200||res.status==304){
    return res.data
  };
  return{
    code:0,
    msg:res.data.msg||res.statusText,
    data:res.statusText
  }
}
/*setTimeout(function () {

});
setTimeout(()=>foo='');*/

//检查code
function checkCode(res) {
  if(res.code==0){
    throw  new Error(res.msg)//创建自定义错误
  }
  return res
}

export default {
  get(url,params){
    if(!url){
      return
    }else {
      if(store.state.token){
        params={
          ...params,
          token:store.state.token
        }
      }
      return axios({
        method:'get',
        url,
        params,
        withCredentials: true,
        //timeout:300000
      }).then(checkStatus).then(checkCode)
    }
  },
  postJson(url,data){
    if(!url){
      return
    }else {
      if(store.state.token){
        data={
          ...data,
          token:store.state.token
        }
      }
      return axios({
        method:'post',
        url,
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
        data:JSON.stringify(data),
        responseType: 'json',
        //timeout:300000
      }).then(checkStatus).then(checkCode)
    }
  },
  post(url,data){
    if(!url){
      return
    }else {
      if(store.state.token){
        data={
          ...data,
          token:store.state.token
        }
      }
      return axios({
        method:'post',
        url:url,
        data:qs.stringify(data),//将对象 序列化成URL的形式，以&进行拼接
        //timeout:300000
      }).then(checkStatus).then(checkCode)
    }
  }
}
