/**
 * @author QER
 * @date 19/6/1
 * @Description: 我的订单－首页
*/
<template>
   <div class="height-warp">
     <ul
       v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading"
       infinite-scroll-distance="10">
       <li v-for="item in list" class="list-warp"  @click="skip($router, item.orderNo)">
         <div flexcont class="list-top">
           <p>订单编号:{{item.orderNo}}</p>
          <i>{{item.statusName}}</i>
         </div>
         <div flexcont  class="list-bottom">
           <p>
            <i>品 规 数 :</i>{{item.drugCount}}<br>
             <span>
             <i>更新时间:</i>{{item.updateDate}}
             </span>
           </p>
           <p><i>金额:</i>&nbsp;{{item.totalPrice}}</p>
         </div>
       </li>
       <li v-if="loadingDom" class="loadingDom">
         <svg class="icon" aria-hidden="true">
           <use xlink:href="#icon-kulian"></use>
         </svg>
         数据已全部加载
       </li>
     </ul>
   </div>
</template>

<script>
  import { InfiniteScroll, MessageBox } from 'mint-ui';
  import {mapState} from 'vuex';
    export default {
        name: "Index",
      components: {},
      data(){
          return{
            loadingImg: true,
            loading: true,
            loadingDom:false,
            totalNum: 0,
            pageSize: 10,
            pageNo: 1,
            list:[]
          }
      },
      async created(){
        this.getList();
      },

      computed:{
        ...mapState(['loadingText','loadingClass'])
      },
      methods: {
        //无限加载函数
        async getList(){
          this.$store.state.loading=true;
          this.$store.state.loadingClass=true;
          this.$store.state.loadingText='一大波数据来袭中...'
          let getGoodsList=await this.$api.order.getGoodsList({
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            findType:'order_list',
          });
          this.$store.state.loading=false;
          if(getGoodsList.code==200){
            let lists=getGoodsList.data.list
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
          }else if(getGoodsList.code==123){
            MessageBox('账号信息过期请重新登录');
            this.out()
          }else {
            MessageBox(getGoodsList.msg);
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
      //记录当前浏览位置
      beforeRouteLeave (to, from, next) {
        this.scrollTop = document.querySelector('.height-warp').scrollTop
        //保存滚动条元素div的scrollTop值
        next()
      },
      beforeRouteEnter (to, from, next) {
        next(vm => {
          document.querySelector('.height-warp').scrollTop = vm.scrollTop
          // 为div元素重新设置保存的scrollTop值
        })
      },
    }
</script>

<style scoped>

</style>
