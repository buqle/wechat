import axios from '@/Utils/featch'
import {route} from './apiRoute'
const base={
  //搜索－公用
  baseSearch(data){
    return new Promise((resolve,reject)=>{
      axios.postJson(`${route}/queryParam`,data)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },
}
export default base
