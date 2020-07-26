<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    <Loading v-show="loading"></Loading>
  </div>
</template>

<script>
  import Loading from '@/components/Loading';
  import {mapState} from 'vuex'
  export default {
    components: { Loading },
    computed:{
      ...mapState(['loading'])
    },
  }
</script>

<style>
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
