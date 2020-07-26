<template>
    <div class="order-list-warp">
      <back-header></back-header>
      <div class="bgfff order-list-tit" flexcont>
        <p>订单号:<i>{{info.orderNo}}</i></p>
        <p>合计金额:<i>{{info.totalPrice}}</i></p>
      </div>
      <dl flexcont v-if="!toggleShow&&opeStatus.length>1" @click="showMOore">
        <dt v-for="(item,index) in opeStatusTwo" :key="index" :class="{'on-dt':item.flag}" flexcont>
          <div class="dt-flexcont" flexcont>
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.flag!=1||item.status==3?'#icon-yiwancheng':'#icon-jinhangzhong'"></use>
            </svg>
            <p v-if="item.status!=3"></p>
            <div v-if="item.status!=3">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhankai"></use>
              </svg>
            </div>
          </div>
          <div class="date" flexcont>
            <span>{{item.statusName}}</span>
            {{item.statusDate}}
            <h4>点击查看更多</h4>
          </div>

        </dt>
      </dl>
      <dl flexcont v-else>
        <dt v-for="(item,index) in opeStatus" :key="index" :class="{'on-dt':item.flag}" flexcont>
          <div class="dt-flexcont" flexcont>
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.flag!=1||item.status==3?'#icon-yiwancheng':'#icon-jinhangzhong'"></use>
            </svg>
            <p v-if="item.status!=3"></p>
          </div>
          <div class="date" flexcont>
            <span>{{item.statusName}}</span>
            {{item.statusDate}}
          </div>
        </dt>
      </dl>
      <div
        v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <div class="bgfff order-list-item" v-for="(item,index) in list" :key="index">
          <h4 v-if="item.ctmmDesc&&item.ctmmDesc.length>20">
            {{item.ctmmDesc|readMore(26,'...')}}
          </h4>
          <h4 v-else>
            {{item.ctmmDesc}}
          </h4>
          <p flexcont>
            <span>单位:{{item.unit}}</span>
            <span>数量:{{item.num}}</span>
            <span>规格:{{item.ctmmSpecification}}</span>
            <span>生产厂家:{{item.ctmmManufacturerName}}</span>
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
  import BackHeader from '@/components/BackHeader'
  import { InfiniteScroll,MessageBox } from 'mint-ui';
    export default {
      components: {BackHeader},
      data(){
        return{
          loadingImg: true,
          loading: true,
          loadingDom:false,
          totalNum: 0,
          pageSize: 10,
          pageNo: 1,
          list:[],
          info:{},
          opeStatus:[],
          toggleShow:false,
          opeStatusTwo:[]
        }
      },
      methods:{
        //无限加载函数
        async getList(){
          this.$store.state.loading=true;
         // this.$store.state.loadingClass=true;
          this.$store.state.loadingText='一大波数据来袭中...'
          this.opeStatusTwo=[]
          let getGoodsList=await this.$api.order.getGoodsList({
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            findType:'order_detail_list',
            params:this.$route.params.id
          });
          this.$store.state.loading=false;
          if(getGoodsList.code==123){
            MessageBox('账号信息过期请重新登录');
            this.out();
            return false;
          }
          //head
          let infos=getGoodsList.data.datas[0];
          this.info.supplierName=infos.supplierName;
          this.info.updateDate=infos.updateDate;
          this.info.orderNo=infos.orderNo;
          this.info.totalPrice=infos.totalPrice;
          this.info.statusName=infos.statusName;
          //status
          this.opeStatus=infos.opeStatus
          this.opeStatusTwo.push(infos.opeStatus[0])
          //list
          let lists=infos.detailVos.list;
          this.totalNum=infos.detailVos.totalPage
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
        },
        showMOore(){
          this.toggleShow=true
        }
      },
      watch:{
        $route(to,from){
          this.getList()
        }
      },
      created(){
        this.$store.state.loadingClass=false;
        this.getList()
      },
    }
</script>

<style scoped>
  .order-list-warp{
    dl{
      pt:20px;flex-direction: column;align-items: center;
      .on-dt{
        p{bg:#ea9f23;}
        c:#ea9f23;
      }
      dt.not-dt{c: #676767;}
      dt{
        c:#a8a8a8;fz:30px;
      span{mb:12px;d:block;fz:35px;}
        p{bg: #d4d4d4;size:1px 60px;align-self: center;}
        .dt-flexcont,.date{flex-direction: column;}
        .dt-flexcont{.icon{size:44px;}w:44px;mr:10px;}
        .date{justify-content: space-between;}
      }
    }
  }
.order-list-tit{
  bdb:1px solid #ddd;text-align: center;padding: 24px 16px;justify-content: space-between;
  fz:30px;
  i{c: #9e9e9e;}
}
</style>
