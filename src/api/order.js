import axios from '@/Utils/featch'
import {getStore} from "@/Utils/storage";
import {route} from './apiRoute'
const order={
  getGoodsList(data){
    return new Promise((resolve,reject)=>{
      axios.postJson(`${route}/findDatas`,data)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        console.log(data)
        reject(err)
      })
    });
  },
  getGoodsListDetail(data){
    return new Promise((resolve,reject)=>{
      axios.postJson(`${route}/findDatas`,data)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        console.log(data)
        reject(err)
      })
    });
  }
}
export default order;
