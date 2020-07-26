
<template>
  <div class="bgfff" style="height: 100vh;">
    <back-header></back-header>

    <div class="login-warp">
      <h2>进入药品物流查询系统</h2>
      <mt-field label="用户名" placeholder="请输入用户名" type="username" v-model="username"></mt-field>
      <mt-field label="密 码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-button type="primary" size="large" @click="login" v-if="!$store.state.loading">登录</mt-button>
      <mt-button type="primary" size="large"  v-else disabled>登录</mt-button>

    </div>
  </div>
</template>

<script>
  import BackHeader from '@/components/BackHeader';
  import { Field,Button , MessageBox} from 'mint-ui';
  import {mapState,mapMutations} from 'vuex';
  import qs from 'qs';
  import {filter} from 'loadsh'
  export default {
    components: {BackHeader},
    data(){
      return{
        username:'',
        password:'',
        wxSate:'',
        show:false,
        type:this.$route.query.type,
        menuList:[]
      }
    },
    computed:{
      ...mapState(['loadingText','loadingClass'])
    },
    methods:{
      ...mapMutations(['RECORD_USERINFO','GET_USERCODE']),

      async  login(){
        if(!this.username){
          MessageBox('请输入用户名');
          return false;
        }else if(!this.password){
          MessageBox('请输入密码');
          return false;
        }
        this.$store.state.loading=true;
        this.$store.state.loadingClass=false;
        this.$store.state.loadingText='登录中...'
        let checkPass=await this.$api.user.checkPassword({password: this.password})
        this.password=checkPass.password;

        this.$store.state.wxSate.username=this.username;
        this.$store.state.wxSate.password=this.password;
        let locationHref=window.location.href;
        let locationHrefsplit=qs.parse(locationHref.split('?')[1])
        //console.log(locationHrefsplit.code)
        this.GET_USERCODE(locationHrefsplit.code)
        this.userInfo=await this.$api.user.userLogin({
          username: this.username,
          password: this.password,
          code:locationHrefsplit.code
        })
        this.$store.state.loading=false;
        console.log(this.userInfo)
        if(this.userInfo.code!=200){
          MessageBox(this.userInfo.msg);
          this.out()
          return;
        }else {
          await this.RECORD_USERINFO(this.userInfo);
          let filterId=filter(this.userInfo.data.deptInfo,(o)=>{
            return o.deptId=='1DC68BAC696E48E9B873B56B8F804F35'
          })
          if(filterId.length){
            this.menuList=filter(filterId[0].menuList,(o)=>{
              return o.id=='94a6dfec4ad84c5cb9710841dd51f2d5'||o.id=='689e112c76034bb696f2c0dc37a1466b'
            })
            console.log(this.menuList)
            if(this.menuList.length==1){
              this.menuList.every((item)=>{
                if(item.id=='94a6dfec4ad84c5cb9710841dd51f2d5'){
                  this.$store.state.footerList.splice(1,1)//若返回只有订单管理就删除菜单下的提醒
                  this.$router.push('/order');
                }else if(item.id=='689e112c76034bb696f2c0dc37a1466b') {
                  this.$store.state.footerList.splice(0,1)//若返回只有提醒就删除菜单下的订单管理
                  this.$router.push('/remind');
                }
              })
            }else{
              this.$router.push('/');
            }
          }else {
            this.$store.state.footerList.splice(0,2)//返回为空的时候
            this.$router.push('/stockCheck');
          }
          //this.$router.push('/');

        }

      }
    }
  }
</script>

<style scoped>

  .login-warp{
  h2{text-align: center;fz:38px;pb:68px;}
  w:90vw;m:0 auto;pt:150px;

  }
</style>

