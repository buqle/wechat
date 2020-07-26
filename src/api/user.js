import axios from '@/Utils/featch'
import {getStore} from "@/Utils/storage";
import {route} from './apiRoute'
const user={
  //检查密码
  checkPassword(params){
    return new Promise((resolve,reject)=>{
      axios.post(`${route}/entryptPassword`,params)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },
  //登录
  userLogin(params){
    return new Promise((resolve,reject)=>{
      axios.post(`${route}/login`,params)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },
  //退出
  loginOuter(params){
    return new Promise((resolve,reject)=>{
      axios.get(`${route}/logout`,params)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    })
  },
}
export default user;

