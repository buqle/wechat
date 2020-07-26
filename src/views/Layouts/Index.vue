<template>
   <div>
    <chat-header></chat-header>
     <transition name="router-slid" mode="out-in">
       <router-view></router-view>
     </transition>
     <chat-footer></chat-footer>
   </div>
</template>

<script>
  import ChatHeader from '@/components/ChatHeader';
  import ChatFooter from '@/components/ChatFooter'
    export default {
        name: "Index",
      components: {ChatHeader,ChatFooter}

    }
</script>

<style scoped>

</style>
