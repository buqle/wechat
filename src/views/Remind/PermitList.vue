/**
 * @author QER
 * @date 19/6/6
 * @Description: 商业企业资质证照提醒 通用
*/
<template>
  <div class="order-list-warp">
    <back-header></back-header>
    <div v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <div class="bgfff order-list-item" v-for="(item,index) in list" :key="index">
        <p class="stcok-tit" flexcont>
          <span v-if="item.enterpriseName&&item.enterpriseName.length>10">
            {{item.enterpriseName|readMore(10,'...')}}
          </span>
          <span v-else>
            {{item.enterpriseName}}
          </span>
          <span>
          <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jinggao"></use>
        </svg>
        临过期时间：<b style="color: red">{{item.expriceDay}}</b>天
       </span>
        </p>
        <h4 v-if="item.licCode&&item.licCode.length>26">
          证照编号:{{item.licCode|readMore(26,'...')}}
        </h4>
        <h4 v-else>
          证照编号:{{item.licCode}}
        </h4>
        <p flexcont>
          <span>生效时间:{{item.productTime}}</span>
          <span>有效期至:{{item.validEndDate}}</span>
        </p>
      </div>
      <div v-if="loadingDom" class="loadingDom">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-kulian"></use>
        </svg>
        数据已全部加载
      </div>
    </div>

  </div>
</template>

<script>
  import BackHeader from '@/components/BackHeader';
  import {MessageBox,InfiniteScroll } from 'mint-ui';
    export default {
      components: {BackHeader},
      data(){
        return{
          list:[],
          loadingImg: true,
          loading: true,
          loadingDom:false,
          totalNum: 0,
          pageSize: 10,
          pageNo: 1,
          findType:this.$route.query.searchType,
        }
      },
      methods:{
        //无限加载函数
        async getList(){
          this.$store.state.loading=true;
          // this.$store.state.loadingClass=true;
          this.$store.state.loadingText='一大波数据来袭中...'
          let getGoodsList=await this.$api.order.getGoodsList({
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            findType:this.findType,
          });
          this.$store.state.loading=false;
          if(getGoodsList.code==123){
            MessageBox('账号信息过期请重新登录');
            this.out();
            return false;
          }
          //list
          let lists=getGoodsList.data.list;
          this.totalNum=getGoodsList.data.totalPage
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
      created(){
        this.$store.state.loadingClass=false;
        this.getList()
      },
    }
</script>

<style scoped>

</style>
