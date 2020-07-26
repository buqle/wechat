<template>
  <dl class="stock-check-warp bgfff">
    <dt v-for="(item,index) in stockData" :key="index" flexcont class="bgfff" @click="goRouter(stockList[index].path,index,item.total,item.type)">
      {{stockList[index].title}}
      <div flexcont flexcont3>
        <mt-badge type="primary">{{item.total}}</mt-badge>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiantou"></use>
        </svg>
      </div>
    </dt>

  </dl>
</template>

<script>
  import { Badge,MessageBox } from 'mint-ui';
  export default {
    data(){
      return{
        stockList:[{
          title:'产品类',
          path:'/remind/productRemind'
        },
          {
            title:'商品企业类',
            title2:'商业企业资质证照提醒',
            path:'/remind/permitList'
          },
          {
            title:'生产企业类',
            title2:'生产企业类资质证照提醒',
            path:'/remind/permitList',
          }],
          stockData:[]
      }
    },
    async created(){
      this.$store.state.loading=true;
      this.$store.state.loadingClass=true;
      this.$store.state.loadingText='一大波数据来袭中...'
      let getGoodsList=await this.$api.order.getGoodsList({
        pageNo:1,
        pageSize:10,
        findType:'lic_exprice',
      });
      this.$store.state.loading=false;
      if(getGoodsList.code==200){
        this.stockData=getGoodsList.data.datas
      }else if(getGoodsList.code==123){
        MessageBox('账号信息过期请重新登录');
        this.out()
      }
    },
    methods:{
      goRouter(path,index,num,searchType){
        this.$router.push({
          path:num!=0?path:'#',
          query:{
            type:index,
            tit:this.stockList[index].title2,
            searchType
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
