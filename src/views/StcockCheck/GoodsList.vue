<template>
  <div class="order-list-warp">
    <seach-box @update="getList" :deptList="dept" :supplierInfo="supplierList"></seach-box>

    <div
      v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading"
      infinite-scroll-distance="10" class="order-list-scroll" :class="{'mt-scroll':deptObj.deptShow}">
      <div class="bgfff order-list-item" v-for="(item,index) in list" :key="index">
        <p v-if="searchType!='store_detail_list'" flexcont class="stcok-tit">
          <span>
             <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yanjing"></use>
            </svg>
            部门:{{item.deptName}}
          </span>
          <span>
            {{searchType=='store_detail_list'?'':searchType=='jxp_list'?'近效期':searchType=='low_store_list'?'低库存':searchType=='delay_store_list'?'呆滞库存':''}}
          </span>
          <span>
             {{searchType=='store_detail_list'?'':searchType=='jxp_list'?'近效期库存':searchType=='low_store_list'?'当前库存':searchType=='delay_store_list'?'呆滞天数':''}}:
            <b style="color: red">{{item.delayDay||item.diffDay}}</b>
          </span>
        </p>
        <p v-else flexcont class="stcok-tit">
           <span>
             <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yanjing"></use>
            </svg>
            部门:{{item.deptName}}
          </span>
        </p>
        <h4 v-if="item.ctmmTradeName&&item.ctmmTradeName.length>20">
          {{item.ctmmTradeName|readMore(26,'...')}}
        </h4>
        <h4 v-else>
          {{item.ctmmTradeName}}
        </h4>
        <p flexcont>
          <span style="color: red">金额:{{item.totalPrice}}</span>
          <span>
            单位:
            {{searchType=='store_detail_list'||searchType=='delay_store_list'?item.replanUnit:searchType=='jxp_list'||searchType=='low_store_list'?item.unit:''}}
          </span>
          <span v-if="searchType=='store_detail_list'">数量:{{item.usableQuantity}}</span>
          <span v-else>当前库存:{{item.usableQuantity||0}}</span>
          <span>规格:{{item.packageSpecification|readMore(10,'...')}}</span>
          <span>生产厂家:{{item.ctmmManufacturerName|readMore(10,'...')}}</span>
        </p>
      </div>
      <div v-if="loadingDom" class="loadingDom">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-kulian"></use>
        </svg>
        数据已全部加载
      </div>
      <div v-if="noMore" class="loadingDom">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-kulian"></use>
        </svg>
        暂无相关数据
      </div>
    </div>

  </div>
</template>

<script>
  import { InfiniteScroll,MessageBox } from 'mint-ui';
  import {mapState} from 'vuex';
  import SeachBox from '@/components/SeachBox'
  export default {
    components: {SeachBox},
    computed:{
      ...mapState(['searchObj','deptObj'])
    },
  created(){
    //this.isJson=true
    this.getList()
    },
    data(){
      return{
        list:[],
        searchType:this.$route.query.searchType,
        loadingImg: true,
        loading: true,
        loadingDom:false,
        totalNum: 0,
        pageSize: 10,
        pageNo: 1,
        noMore:false,
        dis:false,
        dept:[],//部门列表,
        supplierList:[]//厂家列表
      }
    },
    methods:{

      //无限加载函数
      async getList(params,pa){
        this.$store.state.loading=true;
       this.$store.state.loadingClass=false;
        this.$store.state.loadingText='一大波数据来袭中...';
        this.$store.state.searchObj.searchShow=false;
        this.loadingDom = false;
        if(params||pa){
          this.pageNo=1;
          this.list=[]
        }
        let getGoodsList=await this.$api.order.getGoodsList({
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          findType:this.searchType,
          params:this.searchObj.searchWords,
          deptCode:this.deptObj.deptCode,
          supplierCode:this.deptObj.supplierCode
        });
        this.$store.state.loading=false;
        if(getGoodsList.code==123){
          MessageBox('账号信息过期请重新登录');
          this.out();
          return false;
        }

        //部门列表
        if(!this.dept.length){
          this.dept=getGoodsList.data.deptInfo
        }
        //厂家列表
        if(!this.supplierList.length){
          this.supplierList=getGoodsList.data.supplierInfo
        }

        //list
        let lists=getGoodsList.data.list;
        this.totalNum=getGoodsList.data.totalPage;

        if(getGoodsList.data.totalPage!=0){
          this.noMore=false;
          if(lists.length==0&&this.list.length==0){
            this.loading = true;
            this.$store.state.loading=false;
          }else {
            if(lists.length=== parseInt(this.pageSize)){
              for (var i = 0; i < this.pageSize; i++) {
                this.list.push(lists[i]);
              }
              this.loading = false;
            }else {
              this.loading = true;
              this.loadingDom = true;
              this.$store.state.loading=false;
              for (var i = 0; i < lists.length; i++) {
                this.list.push(lists[i]);
              }
            }
            if(lists.length==0||lists.length==9){
              this.loading = true;
              this.loadingDom = true;
            }
          }
        }else {
          this.noMore=true;
          this.loadingDom = false;
          this.list=[]
        }
      },
      loadMore() {
        this.loading = true;
        this.pageNo++;
        if(this.pageNo > this.totalNum){
          this.loading = false
          this.$store.state.loading=false;
          this.loadingDom = true
        }else{
          this.$store.state.loading=false;
          this.getList();

        }
      }
    },
    watch:{
      $route(){
        this.$route.name=this.$route.query.tit;
        this.getList();

      }
    },
    destroyed(){
      this.$store.state.searchObj.searchWords='';
      this.$store.state.searchObj.searchShow=true;
      this.$store.state.deptObj.deptCode='';
      this.$store.state.deptObj.deptShow='';
      this.$store.state.deptObj.supplierCode='';
      this.$store.state.deptObj.supplierShow='';
    }
  }
</script>

<style scoped>

  .order-list-warp{
    .order-list-scroll{mt:220px;}
    .order-list-scroll.mt-scroll{mt:532px;}
  .order-list-item{mt:0;}
  }
</style>
