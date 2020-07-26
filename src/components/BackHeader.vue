<template>
    <div class="header">
      <mt-header  :title="tit">
        <mt-button icon="back" slot="left"  @click="$router.go(-1)"></mt-button>
      </mt-header>
    </div>
</template>

<script>
  import { Header } from 'mint-ui';
  export default {
    data(){
      return{
        tit:''
      }
    },
    created(){
      console.log(this.$route)
      if(this.$route.query.tit){
        this.tit=this.$route.query.tit
      }else {
        this.tit=this.$route.name
      }
    }
  }
</script>

<style scoped>

</style>
