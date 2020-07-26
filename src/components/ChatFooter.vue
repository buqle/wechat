<template>
    <div class="footer size-100vw bgfff" flexcont flexcont2>
      <router-link tag="p" v-for="(item,index) in footerList"  flexcont flexcont2 :to="item.path" :class="{'active':($route.path===item.path&&!on)}" :key="index">
        <svg class="icon" aria-hidden="true" @click="on=false">
          <use :xlink:href="`#${item.icon}`"></use>
        </svg>
        {{item.tit}}
      </router-link>
     <p flexcont  flexcont2 @click="loginOut" :class="{'active':on}">
       <svg class="icon" aria-hidden="true">
         <use xlink:href="#icon-tuichu4"></use>
       </svg>
       退出
     </p>
    </div>
</template>

<script>
  import {mapState} from 'vuex';
  import { MessageBox } from 'mint-ui';
  import { Cookie } from '@/utils/storage'
  export default {
        data(){
          return{
            on:false
          }
        },
        computed:{
          ...mapState(['footerList','token'])
        },
        methods:{
          async loginOut(){
            this.on=true;
            this.$store.state.loading=true;
            this.$store.state.loadingText='退出中...'
            let out= await this.$api.user.loginOuter({
              token:this.token
            });
            this.$store.state.loginName='';
            window.location.reload()
            Cookie.remove(['loginName']);
            this.$store.state.loading=false;
          }
        }
    }
</script>

<style scoped>
  .footer{
    h:110px;border-top: 1px solid #d0cbcb;fz:4.3vw;
    position: fixed;b:0;l:0;justify-content: space-around;c:#666;
  p{flex-direction: column;.icon{size:6vw;}}
  .active{c:#f2a11c;}
  }
</style>
