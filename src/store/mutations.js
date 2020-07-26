import {RECORD_USERINFO,GET_USERCODE,SET_DRUG_LIST} from "./mutationsTypes";
import {Cookie} from "@/utils/storage";
import Vue from 'vue';
export  default {
  [GET_USERCODE](state,code){
    state.loginCode=code
  },
  [RECORD_USERINFO](state,info){
    console.log(info)
    state.token=info.data.token;
    state.loginName=info.data.loginName;
    Cookie.set({
      token:info.data.token,
      loginName:info.data.loginName,
      //JSESSIONID:'A318FB58195F29FB5D64D7F47257E69B'
    })
  },
  [SET_DRUG_LIST](state,res){
    state.drugList=res
  }
}
