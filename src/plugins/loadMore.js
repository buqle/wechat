import store from '@/store'
export default {
  async getList(method,params){
    store.state.loading=true;
    store.state.loadingClass=true;
    store.state.loadingText='一大波数据来袭中...';
    let getGoodsList=method({params})
   /* let getGoodsList=await this.$api.order.getGoodsList({
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      findType:'order_detail_list',
      params:this.$route.params.id
    });*/
    store.state.loading=false;
    let lists=getGoodsList.data.detailVos.list;
    this.totalNum=getGoodsList.data.detailVos.totalPage
    console.log(this.totalNum)
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
      console.log(222)
    }else{
      this.$store.state.loading=false;
      this.getList();

    }
  }
}
