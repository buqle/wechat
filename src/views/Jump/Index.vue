<template>
    
</template>

<script>
  import { Cookie } from '@/utils/storage'
    export default {
        created(){
          this.$store.state.loading=true;
          this.$store.state.loginName='';
          Cookie.remove(['loginName']);
          this.$store.state.loadingText='为您跳转中...'
          window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe28adc88ef924d87&redirect_uri=http%3a%2f%2f60.174.197.140%3a9001%2fdist%2f%23%2flogin&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
        }
    }
</script>

<style scoped>

</style>
