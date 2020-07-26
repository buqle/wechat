<template>
    <dl class="stock-check-warp bgfff">
      <dt v-for="(item,index) in stockData" :key="index" flexcont class="bgfff" @click="goRouter(item.total,index,item.type)">
        {{item.typeName}}
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
  import { Badge ,MessageBox} from 'mint-ui';
  export default {
        data(){
          return{
            stockData:[],
            stockList:[{
              title:'当前在库商品',
              title2:'商品种类库存',
              path:'/goodsList'
            },

              {
                title:'低库存商品',
                title2:'低库存商品库存',
                path:'/goodsList'
              },
              {
                title:'呆滞商品',
                title2:'呆滞商品库存',
                path:'/goodsList'
              },
              {
                title:'近效期商品',
                title2:'近效期商品库存',
                path:'/goodsList'
              },
            ]
          }
        },
    async created(){
      this.$store.state.loading=true;
      this.$store.state.loadingClass=true;
      this.$store.state.loadingText='一大波数据来袭中...'
      let getGoodsList=await this.$api.order.getGoodsList({
        pageNo:1,
        pageSize:10,
        findType:'store_list',
      });
      this.$store.state.loading=false;

      if(getGoodsList.code==200){
        this.stockData=getGoodsList.data.datas
      }else if(getGoodsList.code==123){
        MessageBox('账号信息过期请重新登录');
        this.out();
        return false;
      }
      },
        methods:{
          goRouter(num,index,searchType){
            this.$router.push({
              path:num!=0?'/goodsList':'#',
              query:{
                type:index,
                tit:searchType=='store_detail_list'?'商品种类库存':searchType=='jxp_list'?'近效期商品库存':searchType=='low_store_list'?'低库存商品库存':searchType=='delay_store_list'?'呆滞商品库存':'',
                searchType
              }
            })
          }
        }
    }
</script>

<style scoped>

</style>
