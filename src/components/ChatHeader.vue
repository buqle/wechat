<template>
    <div class="header">
      <mt-header :title="this.$route.name">
      </mt-header>
    </div>
</template>

<script>
  import { Header } from 'mint-ui';
  export default {
    created(){
         console.log(this.$route)
       }
    }

</script>

<style scoped>

</style>
