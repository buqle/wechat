<template>
  <div class="search-box size-100vw">
    <form action="" v-on:submit.prevent="">
      <mt-search
        v-model="searchValue"
        cancel-text="取消"
        placeholder="请输入通用名/商品名"
        :result="result"
        style="width:100%;height:auto;"
      >
        <mt-cell
          v-for="(item,i) in result"
          :title="item.ctmmParam"
          :key="i"
          @click.native="upList(item)"
          @touchmove.prevent
          v-show="$store.state.searchObj.searchShow&&result.length"
        >
        </mt-cell>
      </mt-search>
    </form>
    <dl class="dept-warp">
      <dt @click="$store.state.deptObj.deptShow=!$store.state.deptObj.deptShow">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bumen"></use>
        </svg>
        医院部门:<span>{{this.deptName}}</span>
      </dt>
    </dl>
    <div v-show="deptObj.deptShow" style="background: rgba(0, 0, 0, 0.19);height: 100vh;" @touchmove.prevent>
      <div class="dept-list">
        <p @click="changeDeptAll()">全部</p>
        <p v-for="(item,index) in deptList" :key="index" @click="changeDept(item)" class="size-100vw">
          {{item.deptName}}
        </p>
      </div>
    </div>

    <dl class="dept-warp dept-warp-supplier">
      <dt @click="$store.state.deptObj.supplierShow=!$store.state.deptObj.supplierShow">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gongyingshangguanli"></use>
        </svg>
        供&nbsp;应&nbsp;&nbsp;商:<span>{{this.suppName}}</span>
      </dt>
    </dl>
    <div v-show="deptObj.supplierShow" style="background: rgba(0, 0, 0, 0.19);height: 100vh;" @touchmove.prevent>
      <div class="dept-list">
        <p @click="changeSupplierAll()">全部</p>
        <p v-for="(item,index) in supplierInfo" :key="index" @click="changeSupplier(item)" class="size-100vw">
          {{item.supplierName|readMore(10,'...')}}
        </p>
      </div>
    </div>

  </div>
</template>

<script>
  import { Search,MessageBox } from 'mint-ui';
  import {mapState} from 'vuex';
  import {Local} from "@/utils/storage";

  export default {
    props:['deptList','supplierInfo'],
      data(){
        return{
          searchValue:'',
          result:[],
          focus:false,
          deptName:'全部',
          suppName:'全部'
        }
      },
      methods:{
        upList (item) {
          this.$store.state.searchObj.searchWords=item.bigDrugCode;
          //设置历史记录bigDrugCode
          let aa={
            title:item.ctmmParam,
            route:this.$route.path
          }
          this.$store.state[this.$route.query.searchType].push(aa);
          console.log(this.$store.state[this.$route.query.searchType])
          Local.set(this.$route.query.searchType,  JSON.stringify(this.$store.state[this.$route.query.searchType]))
          this.$emit('update',item.bigDrugCodez);
        },
        //切换医院部门
        changeDeptAll(){
          this.deptName='全部';
          this.$store.state.deptObj.deptCode='';
          this.$store.state.deptObj.deptShow=false;
          this.$emit('update','cc');
        },
        changeSupplierAll(){
          this.suppName='全部';
          this.$store.state.deptObj.supplierCode='';
          this.$store.state.deptObj.supplierShow=false;
          this.$emit('update','cc');
        },
        //部门
        changeDept(item){
          this.deptName=item.deptName;
          this.$store.state.deptObj.deptCode=item.id;
          this.$store.state.deptObj.deptShow=false;
          this.$emit('update',item.id);
        },
        //供应商
        changeSupplier(item){
          this.suppName=item.supplierName;
          this.$store.state.deptObj.supplierCode=item.supplierCode;
          this.$store.state.deptObj.supplierShow=false;
          this.$emit('update',item.supplierCode);
        }
      },
      computed: {
        ...mapState(['searchObj','historyList','deptObj'])
        /*filterResult() {
          // let R = this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value));
          return this.result.filter(value => new RegExp(this.searchValue, 'i').test(value));
        }*/
      },
      watch: {
        async searchValue(newvs, oldvs) {
          if (!newvs) {
            this.$store.state.searchObj.searchWords='';
            this.$emit('update','','update');
          }else {
            this.$store.state.loading=true;
            this.$store.state.loadingText='努力查询数据中...'
            let goodList=await this.$api.base.baseSearch({paramName:newvs})
            if(goodList.data&&goodList.code==200){
              this.result=goodList.data;
              this.$store.state.loading=false;
              console.log(this.result)
              if(this.result.length){
                this.$store.state.searchObj.searchShow=true;
              }else if(this.result.length==0){
                MessageBox('暂无此药品');
              }
            }else if(getGoodsList.code==123){
              MessageBox('账号信息过期请重新登录');
              this.out()
            }

          }
        }
      }
    }
</script>

<style scoped>
  .search-box{position: fixed;t:70px;l:0;h:150px;}
  .dept-warp{
    bg:#108ee9;h:70px;lh:70px;mb:10px;dt{c:#fff;fz:32px;p:0 30px;}
    dt span{ml:28px;}
  }
  .dept-list{
    bg: #fff;h:302px;overflow-y: scroll;
  p{h:80px;lh:80px;bdb:1px solid #cbcbcb;pl:30px;}
  }
  .dept-warp-supplier{
    .icon{size:5.4vw;}
  }
</style>
